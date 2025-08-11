import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orgsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { GithubOrgInstallation } from "@/models/github-org";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { orgData }: {
    orgData: GithubOrgInstallation
  } = body;
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {

  await db.insert(orgsTable).values({
    name: orgData.account.login,
    image: orgData.account.avatar_url,
    userId: userId,
    orgId: orgData.account.id.toString(),
    orgHomeUrl: orgData.account.html_url,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  } catch (error) {
    console.error("Error saving organization:", error);
    return NextResponse.json({ error: "Failed to save organization" }, { status: 500 });
  }  

  return NextResponse.json({ success: true });
}
