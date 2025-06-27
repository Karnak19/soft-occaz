import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string(),

    VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional(),
    WEBHOOK_SECRET: z.string().optional(),
    NODE_ENV: z.enum(['development', 'production']),

    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),

    IMAGEKIT_PRIVATE_KEY: z.string(),

    POCKETBASE_ADMIN_EMAIL: z.string(),
    POCKETBASE_ADMIN_PASSWORD: z.string(),

    DISCORD_WEBHOOK_URL: z.string().optional(),

    RESIZE_IT_API_KEY: z.string(),

    OPENROUTER_API_KEY: z.string(),
    ENABLE_FRANCE_AIRSOFT_SCRAPER: z.string().transform(val => val === 'true').optional().default('true'),
  },
  client: {
    NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
    NEXT_PUBLIC_SITE_URL: z.string().optional(),

    NEXT_PUBLIC_PRICING_TABLE_ID: z.string(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),

    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: z.string(),

    NEXT_PUBLIC_POCKETBASE_URL: z.string(),

    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,

    RESEND_API_KEY: process.env.RESEND_API_KEY,

    VERCEL_ENV: process.env.VERCEL_ENV,
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
    NODE_ENV: process.env.NODE_ENV,

    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_PRICING_TABLE_ID: process.env.NEXT_PUBLIC_PRICING_TABLE_ID,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,

    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,

    NEXT_PUBLIC_POCKETBASE_URL: process.env.NEXT_PUBLIC_POCKETBASE_URL,
    POCKETBASE_ADMIN_EMAIL: process.env.POCKETBASE_ADMIN_EMAIL,
    POCKETBASE_ADMIN_PASSWORD: process.env.POCKETBASE_ADMIN_PASSWORD,

    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,

    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,

    RESIZE_IT_API_KEY: process.env.RESIZE_IT_API_KEY,

    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    ENABLE_FRANCE_AIRSOFT_SCRAPER: process.env.ENABLE_FRANCE_AIRSOFT_SCRAPER,
  },
});
