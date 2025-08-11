import type { IconProps } from "@/types/icon-props";

export function SwitchOrgIcon(props: IconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 12h20M16 6l6 6-6 6" />
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}
