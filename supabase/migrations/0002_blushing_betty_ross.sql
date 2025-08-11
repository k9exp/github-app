CREATE INDEX "orgs_user_id_idx" ON "orgs_table" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "orgs_org_id_idx" ON "orgs_table" USING btree ("org_id");--> statement-breakpoint
CREATE UNIQUE INDEX "orgs_user_id_org_id_unique" ON "orgs_table" USING btree ("user_id","org_id");