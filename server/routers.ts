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
    analyzeLLM: publicProcedure
      .input(z.object({ prompt: z.string() }))
      .mutation(async ({ input }) => {
        try {
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: "You are NEXERGY AI, an advanced operational intelligence platform providing technical, actionable analysis for industrial operations. Be concise, specific, and focus on actionable insights.",
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
