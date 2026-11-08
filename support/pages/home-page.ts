import type { Page } from "@playwright/test";
import { HttpContext } from "@support/lib";

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await new HttpContext(this.page)
      .waitForResponse({ method: "GET", path: "/articles" })
      .after(() => this.page.goto("/"));
  }

  getActiveFeedTab() {
    return this.page.locator(".feed-toggle a.active");
  }

  getArticlePreview(title: string) {
    return this.page.locator(".article-preview").filter({ hasText: title });
  }

  getUserLink(username: string) {
    return this.page.getByRole("link", { name: username });
  }

  getSignInLink() {
    return this.page.getByRole("link", { name: "Sign in" });
  }
}
