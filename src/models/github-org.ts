export interface GithubOrgAccount {
  login: string; // Organization Name
  id: number; // Org Id
  node_id: string;
  avatar_url: string; // URL to Org Avatar
  gravatar_id: string;
  url: string;
  html_url: string; // public URL to the organization
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}

export interface GithubOrgPermissions {
  issues: string;
  members: string;
  contents: string;
  metadata: string;
  statuses: string;
  codespaces: string;
  merge_queues: string;
  pull_requests: string;
  administration: string;
  repository_projects: string;
  organization_projects: string;
  organization_private_registries: string;  
}

export interface GithubOrgInstallation {
  id: number;
  client_id: string;
  account: GithubOrgAccount;
  repository_selection: string;
  access_tokens_url: string;
  repositories_url: string;
  html_url: string; // github org url (public)
  app_id: number; // GitHub App ID
  app_slug: string; // GitHub App Slug
  target_id: number;
  target_type: string;
  permissions: GithubOrgPermissions;
  events: string[];
  created_at: string;
  updated_at: string;
  single_file_name: string | null;
  has_multiple_single_files: boolean;
  single_file_paths: string[];
  suspended_by: any;
  suspended_at: string | null;
}
