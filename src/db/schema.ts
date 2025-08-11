import { pgTable, serial, text, timestamp, index, uniqueIndex } from 'drizzle-orm/pg-core';
export const orgsTable = pgTable('orgs_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  image: text('image').notNull(),
  userId: text('user_id').notNull(),
  orgId: text('org_id').notNull(),
  orgHomeUrl: text('org_home_url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (org) => [
    index('orgs_user_id_idx').on(org.userId),
    index('orgs_org_id_idx').on(org.orgId),
    uniqueIndex('orgs_user_id_org_id_unique').on(org.userId, org.orgId),
]);

export type InsertOrg = typeof orgsTable.$inferInsert;
export type SelectOrg = typeof orgsTable.$inferSelect;
