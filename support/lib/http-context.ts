import type { Page, Response } from "@playwright/test";

export interface ResponseMatch {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  status?: number;
}

export class HttpContext {
  private match?: ResponseMatch;

  constructor(private page: Page) {}

  waitForResponse(match: ResponseMatch) {
    this.match = match;
    return this;
  }

  async after(action: () => Promise<unknown>): Promise<Response> {
    const match = this.match;
    if (!match) {
      throw new Error("call waitForResponse before after");
    }

    const [response] = await Promise.all([
      this.page.waitForResponse(
        (candidate) =>
          candidate.request().method() === match.method &&
          new URL(candidate.url()).pathname.endsWith(match.path),
      ),
      action(),
    ]);

    const hasExpectedStatus =
      match.status === undefined ? response.ok() : response.status() === match.status;
    if (!hasExpectedStatus) {
      throw new Error(
        `${match.method} ${match.path} failed: ${response.status()} ${await response.text()}`,
      );
    }
    return response;
  }
}
