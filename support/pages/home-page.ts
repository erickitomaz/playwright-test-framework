import type { Page } from "@playwright/test";
import { HttpContext } from "@support/lib";

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await new HttpContext(this.page)
      .waitForResponse({ method: "GET", path: "/tags" })
      .after(() => this.page.goto("/"));
  }

  getUserLink(username: string) {
    return this.page.getByRole("link", { name: username });
  }

  getSignInLink() {
    return this.page.getByRole("link", { name: "Sign in" });
  }
}
