import { Resource } from "./resolver.js";

export function generateURL(currentAccount: string, res: Resource): string {
  const [, currentDomain = ""] = currentAccount.split("@");
  switch (res.type) {
    case "Account":
      return `https://${currentDomain}/@${res.username}@${res.domain}`;
    case "Status":
      return `https://${currentDomain}/@${res.username}@${res.domain}/${res.status_id}`;
    default:
      throw new Error(`Invalid type: ${(res as { type: "_invalid" }).type}`);
  }
}
