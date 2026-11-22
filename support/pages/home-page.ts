import type { Page } from "@playwright/test";
import { HttpContext, type NavigateOptions } from "@support/lib";

export class HomePage {
  constructor(private page: Page) {}

  async navigate(options: NavigateOptions = {}) {
    await new HttpContext(this.page)
      .waitForResponse({ method: "GET", path: "/articles", status: options.status })
      .after(() => this.page.goto("/"));
  }

  getActiveFeedTab() {
    return this.page.locator(".feed-toggle a.active");
  }

  getLoadingMessage() {
    return this.page.getByText("Loading articles...");
  }

  getEmptyFeedMessage() {
    return this.page.getByText("No articles are here... yet.");
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
