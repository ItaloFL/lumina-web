import { z } from "zod";

const envSchema = z.object({
  VITE_BASEURL_API: z.string(),
});

export const env = envSchema.parse(import.meta.env);
