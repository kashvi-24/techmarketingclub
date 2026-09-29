import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const subscribers = sqliteTable('subscribers', {
  email: text('email').primaryKey(),
  joinedAt: text('joined_at').notNull(),
  consent: text('consent').notNull(),
  fullName: text('full_name'),
  workplace: text('workplace'),
  role: text('role'),
  location: text('location'),
  strength: text('strength'),
});
