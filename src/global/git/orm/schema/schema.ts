import { InferModel } from 'drizzle-orm'
import {
  foreignKey,
  integer,
  numeric,
  sqliteTable,
  text,
  int,
  
} from 'drizzle-orm/sqlite-core'

export const BeritaSchema = sqliteTable('berita', {
  id: int('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author'),
  headline: text('headline'),
  tags: text('tags'),
  cover: text('cover'),
  content: text('content'),
  compiledHash: text('compiledHash'),
  compiledPath: text('compiledPath'),
  dateCreated:text('dateCreated'),
  dateUpdated:text('dateUpdated')
})
export const ProdukSchema = sqliteTable('produk', {
  id: int('id').primaryKey(),
  title: text('title').notNull(),
  kategori: text('kategori'),
  headline: text('headline'),
  tags: text('tags'),
  cover: text('cover'),
  content: text('content'),
  compiledHash: text('compiledHash'),
  compiledPath: text('compiledPath'),
  dateCreated:text('dateCreated'),
  dateUpdated:text('dateUpdated')
})


export type MDBerita = InferModel<typeof BeritaSchema>
export type MDProduk = InferModel<typeof ProdukSchema>
