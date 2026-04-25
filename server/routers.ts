import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createLead, getAllLeads, getBlogPosts, getBlogPostBySlug, getFeaturedCaseStudies, getCaseStudyBySlug, getAllCaseStudies, createBlogPost, createCaseStudy } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        resourceType: z.enum(["assessment", "playbook", "calculator"]),
      }))
      .mutation(async ({ input }) => {
        await createLead(input);
        return { success: true };
      }),
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
      return getAllLeads();
    }),
  }),

  blog: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return getBlogPosts(input?.limit);
      }),
    getBySlug: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        return getBlogPostBySlug(input);
      }),
    create: protectedProcedure
      .input(z.object({
        slug: z.string(),
        title: z.string(),
        excerpt: z.string().optional(),
        content: z.string(),
        category: z.string(),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return createBlogPost(input);
      }),
  }),

  caseStudies: router({
    featured: publicProcedure.query(async () => {
      return getFeaturedCaseStudies();
    }),
    getBySlug: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        return getCaseStudyBySlug(input);
      }),
    getAll: publicProcedure.query(async () => {
      return getAllCaseStudies();
    }),
    create: protectedProcedure
      .input(z.object({
        slug: z.string(),
        clientName: z.string(),
        industry: z.string(),
        challenge: z.string(),
        solution: z.string(),
        results: z.string(),
        metrics: z.string().optional(),
        testimonial: z.string().optional(),
        testimonialAuthor: z.string().optional(),
        testimonialTitle: z.string().optional(),
        imageUrl: z.string().optional(),
        featured: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return createCaseStudy(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
