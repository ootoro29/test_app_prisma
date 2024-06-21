import { z } from 'zod';

/////////////////////////////////////////
// ARTICLE SCHEMA
/////////////////////////////////////////

export const ArticleSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
})

export type Article = z.infer<typeof ArticleSchema>

/////////////////////////////////////////
// ARTICLE PARTIAL SCHEMA
/////////////////////////////////////////

export const ArticlePartialSchema = ArticleSchema.partial()

export type ArticlePartial = z.infer<typeof ArticlePartialSchema>

/////////////////////////////////////////
// ARTICLE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ArticleOptionalDefaultsSchema = ArticleSchema.merge(z.object({
  id: z.number().optional(),
}))

export type ArticleOptionalDefaults = z.infer<typeof ArticleOptionalDefaultsSchema>

export default ArticleSchema;
