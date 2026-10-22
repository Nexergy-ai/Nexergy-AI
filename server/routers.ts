import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";

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
    createIngestion: publicProcedure
      .input(
        z.object({
          sourceName: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || "43ea0b6d2de942d445b42960a4d3f545";
        const databaseId = process.env.CLOUDFLARE_DATABASE_ID || "79a372b5-a955-475e-89cf-b33f1c428c89";
        const token = process.env.CLOUDFLARE_D1_TOKEN || "cfut_UEFKJYgcdtcmW1VmX16ZAfKzRYP3c4CcYf45dlJHc56a8ca4";

        let d1Success = false;
        let d1Result = null;

        // 1. INSERCIÓN EN CLOUDFLARE D1 (SQL)
        try {
          const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

          const response = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sql: "INSERT INTO ingestions (source_name, created_at) VALUES (?, datetime('now'))",
              params: [input.sourceName],
            }),
          });

          const data = await response.json();
          if (data.success) {
            d1Success = true;
            d1Result = data.result;
          }
        } catch (error) {
          console.error("Cloudflare D1 Ingestion Error:", error);
        }

        // 2. DESPACHO DE NOTIFICACIÓN POR MAIL A LAS 3 DIRECCIONES
        const recipients = [
          "contacto@nexergy.ar",
          "jj.lopez@nexergy.ar",
          "jbosso@nexergy.ar"
        ];

        try {
          const mailApiKey = process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY;
          if (mailApiKey) {
            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${mailApiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from: "Onboarding Nexergy AI <onboarding@nexergy.ar>",
                to: recipients,
                subject: "🚨 NUEVO LEAD EN ONBOARDING - Nexergy AI",
                html: `
                  <div style="font-family: Arial, sans-serif; background: #070c1e; color: #ffffff; padding: 24px; border-radius: 10px; border: 1px solid #00BFFF;">
                    <h2 style="color: #00BFFF; margin-top: 0;">Nuevo Alta de Instalación Registrada</h2>
                    <p style="font-size: 14px; color: #e2e8f0;">Un nuevo usuario ha completado el formulario de alta de instalación:</p>
                    <div style="background: #0a0e27; padding: 15px; border-left: 4px solid #00BFFF; margin: 15px 0; border-radius: 4px;">
                      <pre style="color: #38bdf8; font-size: 13px; font-family: monospace; white-space: pre-wrap; margin: 0;">${input.sourceName}</pre>
                    </div>
                    <p style="font-size: 11px; color: #94a3b8;">Asentado en Cloudflare D1 (nexergy-db) · Operaciones Nexergy AI</p>
                  </div>
                `,
              }),
            });
          }
        } catch (mailError) {
          console.error("Error enviando notificaciones de lead por correo:", mailError);
        }

        return { success: true, d1Success, result: d1Result };
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
          return { content };
        } catch (error) {
          console.error("LLM Error:", error);
          throw new Error("Failed to generate intelligence analysis");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
