import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orgsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ orgs: [] }, { status: 401 });
  }
  const orgs = await db.select().from(orgsTable).where(eq(orgsTable.userId, userId));
  return NextResponse.json({ orgs });
}
