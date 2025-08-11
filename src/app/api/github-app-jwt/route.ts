import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY!;

  if (!privateKey) {
    return NextResponse.json({ error: "GitHub App private key not configured" }, { status: 500 });
  }
  if (!process.env.GITHUB_APP_ID) {
    return NextResponse.json({ error: "GitHub App ID not configured" }, { status: 500 });
  }

  const appId = Number(process.env.GITHUB_APP_ID!);

  const now = Math.floor(Date.now() / 1000);

  const payload = {
    iat: now - 60, // issued at time, 60 seconds in the past
    exp: now + 10 * 60, // expires after 10 minutes
    iss: appId, // GitHub App ID
  };

  const token = jwt.sign(payload, privateKey, { algorithm: "RS256" });

  return NextResponse.json({ jwt: token });
}