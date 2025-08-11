'use client';

import Image from "next/image";
import { SwitchOrgIcon } from "@/assets/icons/SwitchOrgIcon";
import Link from "next/link";
import { useOrg } from "@/components/Org/OrgContext";

export default function OrganizationView() {
    const { org } = useOrg();
    if (!org) return null;
    return (
      <Link
       href="/orgs" className="max-xl:hidden flex items-center cursor-pointer group">
        <div className="relative">
          <Image alt="org image" src={org.image} width={36} height={36} className="rounded-md" />
          <span className="absolute -top-1 -right-1 bg-white dark:bg-gray-dark p-1 rounded-full shadow group-hover:scale-110 transition-transform">
            <SwitchOrgIcon className="w-4 h-4 text-primary" />
            <span className="sr-only">Switch Organization</span>
          </span>
        </div>
        <div className="ml-2">
          <h1 className="mb-0.5 text-heading-6 font-bold text-dark dark:text-white">
            {org.name}
          </h1>
        </div>
      </Link>
    );
}