export type Resource = AccountResource | StatusResource;
export type AccountResource = {
  type: "Account";
  username: string;
  domain: string;
};
export type StatusResource = {
  type: "Status";
  username: string;
  domain: string;
  status_id: string;
};

const ACCOUNT_PATHS = [
  /^\/@(?<username>[^@\/.]+)\/?$/,
  /^\/@(?<username>[^@\/.]+)\/with_replies\/?$/,
  /^\/@(?<username>[^@\/.]+)\/media\/?$/,
  /^\/@(?<username>[^@\/.]+)\/tagged\/[^\/]+\/?$/,
  /^\/@(?<username>[^@\/.]+)\/following\/?$/,
  /^\/@(?<username>[^@\/.]+)\/followers\/?$/,
];
const STATUS_PATHS = [
  /^\/@(?<username>[^@\/.]+)\/(?<status_id>\d+)\/?$/,
  /^\/@(?<username>[^@\/.]+)\/(?<status_id>\d+)\/embed\/?$/,
];
export function resolveURL(url: string): Resource | undefined {
  const u = new URL(url);
  if (u.protocol !== "http:" && u.protocol !== "https:") return;
  console.log(u);

  for (const re of ACCOUNT_PATHS) {
    const match = re.exec(u.pathname);
    if (match) {
      return {
        type: "Account",
        username: match.groups!["username"]!.toLowerCase(),
        domain: u.host.toLowerCase(),
      };
    }
  }
  for (const re of STATUS_PATHS) {
    const match = re.exec(u.pathname);
    if (match) {
      return {
        type: "Status",
        username: match.groups!["username"]!.toLowerCase(),
        domain: u.host.toLowerCase(),
        status_id: match.groups!["status_id"]!,
      };
    }
  }
}
