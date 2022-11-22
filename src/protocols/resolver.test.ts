import { describe, expect, it } from "@jest/globals";
import { resolveURL } from "./resolver.js";

describe("resolveURL", () => {
  describe("Mastodon account URLs", () => {
    const examples = [
      "https://example.com/@acct",
      "https://example.com/@acct/",
      "https://example.com/@acct/followers",
      "https://example.com/@acct/following",
      "https://example.com/@acct/media",
      "https://example.com/@acct/media/",
      "https://example.com/@acct/tagged/js",
      "https://example.com/@acct/tagged/js/",
      "https://example.com/@acct/with_replies",
      "https://example.com/@acct/with_replies/",
      // Insecure HTTP
      "http://example.com/@acct",
      // Uppercasing domain
      "https://Example.Com/@acct",
      // Uppercasing username
      "https://Example.Com/@ACCT",
    ];
    for (const url of examples) {
      it(`resolves ${url}`, () => {
        const res = resolveURL(url);
        expect(res).toEqual({
          type: "Account",
          username: "acct",
          domain: "example.com",
        });
      });
    }
  });

  describe("Mastodon status URLs", () => {
    const examples = [
      "https://example.com/@acct/12345",
      "https://example.com/@acct/12345/",
      // Insecure HTTP
      "http://example.com/@acct/12345",
      // Uppercasing domain
      "https://Example.Com/@acct/12345",
      // Uppercasing username
      "https://Example.Com/@ACCT/12345",
    ];
    for (const url of examples) {
      it(`resolves ${url}`, () => {
        const res = resolveURL(url);
        expect(res).toEqual({
          type: "Status",
          username: "acct",
          domain: "example.com",
          status_id: "12345",
        });
      });
    }
  });

  it("Rejects non-Mastodon URLs for now", () => {
    expect(resolveURL("https://example.com/getting-started")).toBe(undefined);
  })

  it("Rejects non-http URLs", () => {
    expect(resolveURL("file://example.com/@acct")).toBe(undefined);
  })
});
