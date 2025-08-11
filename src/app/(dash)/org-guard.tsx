"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrg } from "@/components/Org/OrgContext";

export default function OrgGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { org, setOrg } = useOrg();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkOrgs() {
      const res = await fetch("/api/user-orgs");
      if (res.status === 401) {
        router.replace("/auth/sign-in");
        return;
      }
      const data = await res.json();
      if (!data.orgs || data.orgs.length === 0) {
        router.replace("/connect/org/github");
        return;
      }
      // If no org in context, set the first one as default
      if (!org) {
        setOrg({
          orgId: data.orgs[0].orgId,
          name: data.orgs[0].name,
          image: data.orgs[0].image,
          orgHomeUrl: data.orgs[0].orgHomeUrl,
        });
      }
      setChecking(false);
    }
    checkOrgs();
    // Only run on mount
    // eslint-disable-next-line
  }, []);

  if (checking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-lg text-gray-500 animate-fade-in">
        <svg className="animate-spin h-8 w-8 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <span className="font-semibold text-primary">Checking your organization access…</span>
        <span className="text-sm text-gray-400">Please wait while we verify your access and load your dashboard.</span>
      </div>
    );
  }

  return <>{children}</>;
}
