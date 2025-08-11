"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type OrgContextType = {
  org: {
    orgId: string;
    name: string;
    image: string;
    orgHomeUrl: string;
  } | null;
  setOrg: (org: OrgContextType["org"]) => void;
};

const OrgContext = createContext<OrgContextType | undefined>(undefined);

export function OrgProvider({ children }: { children: React.ReactNode }) {
  const [org, setOrgState] = useState<OrgContextType["org"]>(null);

  useEffect(() => {
    // Try to load org from localStorage
    const stored = localStorage.getItem("orgalyze_current_org");
    if (stored) {
      setOrgState(JSON.parse(stored));
    }

    // Listen for custom event to set org from other parts of the app
    const handler = (e: CustomEvent) => {
      if (e.detail && typeof e.detail === "object") {
        setOrg(e.detail);
      }
    };
  }, []);

  const setOrg = (org: OrgContextType["org"]) => {
    setOrgState(org);
    if (org) {
      localStorage.setItem("orgalyze_current_org", JSON.stringify(org));
    } else {
      localStorage.removeItem("orgalyze_current_org");
    }
  };

  return (
    <OrgContext.Provider value={{ org, setOrg }}>
      {children}
    </OrgContext.Provider>
  );
}

export function useOrg() {
  const ctx = useContext(OrgContext);
  if (!ctx) throw new Error("useOrg must be used within OrgProvider");
  return ctx;
}
