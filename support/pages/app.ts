import type { Page } from "@playwright/test";
import { ArticlePage } from "@support/pages/article-page";
import { EditorPage } from "@support/pages/editor-page";
import { HomePage } from "@support/pages/home-page";

export class App {
  constructor(private page: Page) {}

  getHomePage() {
    return new HomePage(this.page);
  }

  getEditorPage() {
    return new EditorPage(this.page);
  }

  getArticlePage() {
    return new ArticlePage(this.page);
  }
}
