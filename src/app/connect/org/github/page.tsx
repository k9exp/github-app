"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui-elements/button";
import { CheckIcon, GitHubIcon } from "@/assets/icons";
import { Logo } from "@/components/logo";
import { Spinner } from "@/components/ui-elements/spinner";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GithubOrgInstallation } from "@/models/github-org";

const GITHUB_APP_SLUG = "orgalyze";
const GITHUB_APP_INSTALL_URL = `https://github.com/apps/${GITHUB_APP_SLUG}/installations/new`;

function OrganizationsPageClient() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string | null>(null);
  const [installationId, setInstallationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setCode(searchParams.get("code"));
    setInstallationId(searchParams.get("installation_id"));
  }, [searchParams]);

  useEffect(() => {
    const fetchOrgInfo = async () => {
      if (code && installationId) {
        setLoading(true);
        setError(null);
        try {
          // 1. Get JWT from API
          const jwtRes = await fetch("/api/github-app-jwt");
          const jwtData = await jwtRes.json();
          const jwt = jwtData.jwt;

          // 2. Use JWT to get organization info
          const orgRes = await fetch(`https://api.github.com/app/installations/${installationId}`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
          });
          const orgData = await orgRes.json() as GithubOrgInstallation;
          if (!orgRes.ok) {
            throw new Error("Failed to fetch organization info");
          }

          // Save org info to DB via API route
          const saveRes = await fetch("/api/save-org", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orgData }),
          });
          if (!saveRes.ok) {
            throw new Error("Failed to save organization info");
          }
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/";
          }, 1200);
        } catch (e: any) {
          setError(e.message || "Failed to fetch organization info");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrgInfo();
  }, [code, installationId]);

  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <Logo />
      <h1 className="text-2xl font-bold">Connect Your GitHub Organization</h1>
      <p className="text-gray-600 max-w-md text-center">
        To get started, please connect your GitHub organization. This will allow Orgalyze to access your repositories and provide insights into your projects.
      </p>
      <div className="flex gap-4">
        <a
          href={GITHUB_APP_INSTALL_URL}
          rel="noopener noreferrer"
          className="inline-block w-fit"
        >
          <Button
            shape="rounded"
            label={success ? "Done, Redirecting..." : loading ? "" : code && installationId ? "Fetching Organization Info..." : "Connect Your Organization"}
            size="default"
            variant="primary"
            icon={success ? <CheckIcon /> : loading ? <Spinner size="sm" /> : <GitHubIcon />}
            disabled={loading || !!(code && installationId)}
          />
        </a>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </main>
  );
}

export default function OrganizationsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-[60vh]"><Spinner size="sm" /> Loading...</div>}>
      <OrganizationsPageClient />
    </Suspense>
  );
}
