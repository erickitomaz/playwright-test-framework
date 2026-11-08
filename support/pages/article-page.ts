import type { Page } from "@playwright/test";

export class ArticlePage {
  constructor(private page: Page) {}

  getTitle() {
    return this.page.getByRole("heading", { level: 1 });
  }
}
