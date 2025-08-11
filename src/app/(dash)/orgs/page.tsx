import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import { GitHubIcon } from "@/assets/icons";
import { Metadata } from "next";
import { db } from "@/db";
import { orgsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Suspense } from "react";
import Image from "next/image";
import { SingleStoreProxyTransaction } from "drizzle-orm/singlestore-proxy";

export const metadata: Metadata = {
  title: "Organizations | Orgalyze",
}

const GITHUB_APP_SLUG = "orgalyze";
const GITHUB_APP_INSTALL_URL = `https://github.com/apps/${GITHUB_APP_SLUG}/installations/new`;

async function getUserOrgs() {
  const { userId } = await auth();
  if (!userId) return [];
  // Fetch organizations for the authenticated user
  return db.select().from(orgsTable).where(eq(orgsTable.userId, userId));
}

async function OrgsList() {
  const orgs = await getUserOrgs();
  return orgs.length === 0 ? (
    <div className="text-center">
      <p>No Organizations</p>
    </div>
  ) : (
    <ShowcaseSection title="Your Organizations">
      <ul>
        {orgs.map((org: any) => (
          <li key={org.orgId} className="flex items-center gap-2 py-2">
            <Image src={org.image} alt={org.name} width={28} height={28} className="rounded-md" />
            <a href={org.orgHomeUrl} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">{org.name}</a>
          </li>
        ))}
      </ul>
    </ShowcaseSection>
  );
}

const OrganizationsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Organizations" />
      <main className="flex flex-col gap-4">
        <a
          href={GITHUB_APP_INSTALL_URL}
          rel="noopener noreferrer"
          target="_blank"
          className="inline-block w-fit"
        >
          <Button
            shape="rounded"
            label="Connect GitHub Organization"
            size="small"
            variant="outlinePrimary"
            icon={<GitHubIcon />}
          />
        </a>
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-lg text-gray-500 animate-fade-in">
              <svg className="animate-spin h-8 w-8 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="font-semibold text-primary">Loading your organizations…</span>
              <span className="text-sm text-gray-400">Please wait while we fetch your organizations.</span>
            </div>
          }
        >
          <OrgsList />
        </Suspense> 
      </main>
    </>
  );
};

export default OrganizationsPage;
