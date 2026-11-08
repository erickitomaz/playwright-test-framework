import { test, expect, buildArticle, createArticle } from "@support";

test("an article created through the API shows up in the global feed", async ({
  app,
  request,
  currentUser,
}) => {
  const newArticle = buildArticle();
  await createArticle(request, currentUser.token, newArticle);

  const homePage = app.getHomePage();
  await homePage.navigate();
  await expect(homePage.getActiveFeedTab()).toHaveText("Global Feed");

  const articlePreview = homePage.getArticlePreview(newArticle.title);
  await expect(articlePreview).toBeVisible();
  await expect(articlePreview).toContainText(newArticle.description);
  await expect(articlePreview).toContainText(currentUser.username);
});
