import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Configuración del cliente para Cloudflare R2 utilizando compatibilidad S3
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  ai: router({
    // Procedimiento tRPC para guardar la ingesta en Cloudflare D1
    createIngestion: publicProcedure
      .input(
        z.object({
          sourceName: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
          const databaseId = process.env.CLOUDFLARE_DATABASE_ID;
          const token = process.env.CLOUDFLARE_D1_TOKEN;

          const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

          const response = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sql: "INSERT INTO ingestions (source_name) VALUES (?)",
              params: [input.sourceName],
            }),
          });

          const data = await response.json();

          if (!data.success) {
            console.error("D1 Error Response:", data);
            throw new Error("Cloudflare D1 Query Failed");
          }

          return {
            success: true,
            result: data.result,
          };
        } catch (error) {
          console.error("Cloudflare D1 Ingestion Error:", error);
          throw new Error("Failed to store ingestion record in Cloudflare D1");
        }
      }),

    // Procedimiento tRPC para generar la URL presignada de Cloudflare R2
    getUploadUrl: publicProcedure
      .input(
        z.object({
          fileName: z.string(),
          fileType: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const fileKey = `imports/${Date.now()}-${input.fileName}`;
          const command = new PutObjectCommand({
            Bucket: "nexergy-plant-data",
            Key: fileKey,
            ContentType: input.fileType,
          });

          const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });

          return {
            uploadUrl,
            fileKey,
          };
        } catch (error) {
          console.error("R2 Presigned URL Error:", error);
          throw new Error("Failed to generate upload URL for Cloudflare R2");
        }
      }),

    analyzeLLM: publicProcedure
      .input(z.object({ prompt: z.string() }))
      .mutation(async ({ input }) => {
        try {
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content:
                  "You are NEXERGY AI, an advanced operational intelligence platform providing technical, actionable analysis for industrial operations. Be concise, specific, and focus on actionable insights.",
              },
              {
                role: "user",
                content: input.prompt,
              },
            ],
          });

          const content = response.choices[0]?.message.content || "No response generated";
          return {
            content,
          };
        } catch (error) {
          console.error("LLM Error:", error);
          throw new Error("Failed to generate intelligence analysis");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
