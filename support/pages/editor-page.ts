import type { Page } from "@playwright/test";
import type { CreateArticleResponse } from "@support/api";
import { HttpContext, Queueable } from "@support/lib";

export class EditorPage {
  private queueable = new Queueable();

  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("/editor");
    await this.getTitleInput().waitFor();
  }

  setTitle(value: string) {
    this.queueable.enqueue(() => this.getTitleInput().fill(value));
    return this;
  }

  setDescription(value: string) {
    this.queueable.enqueue(() =>
      this.page.getByPlaceholder("What's this article about?").fill(value),
    );
    return this;
  }

  setBody(value: string) {
    this.queueable.enqueue(() =>
      this.page.getByPlaceholder("Write your article (in markdown)").fill(value),
    );
    return this;
  }

  setTags(values: string[]) {
    for (const value of values) {
      this.queueable.enqueue(async () => {
        const tagInput = this.page.getByPlaceholder("Enter tags");
        await tagInput.fill(value);
        await tagInput.press("Enter");
      });
    }
    return this;
  }

  async publish(): Promise<CreateArticleResponse> {
    const response = await new HttpContext(this.page)
      .waitForResponse({ method: "POST", path: "/articles" })
      .after(async () => {
        await this.queueable.apply();
        await this.page.getByRole("button", { name: "Publish Article" }).click();
      });
    const body = await response.json();
    return body.article;
  }

  private getTitleInput() {
    return this.page.getByPlaceholder("Article Title");
  }
}
