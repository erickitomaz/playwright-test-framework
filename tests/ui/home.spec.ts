import { test, expect, buildArticle, createArticle } from "@support";

const articlesRoute = "**/api/articles?*";

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

test("the feed shows the empty state when the API returns no articles", async ({ app, page }) => {
  await page.route(articlesRoute, (route) =>
    route.fulfill({ json: { articles: [], articlesCount: 0 } }),
  );

  const homePage = app.getHomePage();
  await homePage.navigate();

  await expect(homePage.getEmptyFeedMessage()).toBeVisible();
  await expect(homePage.getLoadingMessage()).toBeHidden();
});

test("the feed stays in the loading state and does not crash when the API fails", async ({
  app,
  page,
}) => {
  await page.route(articlesRoute, (route) =>
    route.fulfill({ status: 500, json: { errors: { server: ["internal error"] } } }),
  );

  const homePage = app.getHomePage();
  await homePage.navigate({ status: 500 });

  await expect(homePage.getActiveFeedTab()).toHaveText("Global Feed");
  await expect(homePage.getLoadingMessage()).toBeVisible();
  await expect(homePage.getEmptyFeedMessage()).toBeHidden();
});

test("the feed shows the loading state while the response is slow, then the list", async ({
  app,
  page,
  request,
  currentUser,
}) => {
  const newArticle = buildArticle();
  await createArticle(request, currentUser.token, newArticle);

  let releaseResponse = () => {};
  const responseReleased = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });

  await page.route(articlesRoute, async (route) => {
    const response = await route.fetch();
    await responseReleased;
    await route.fulfill({ response });
  });

  const homePage = app.getHomePage();
  const navigation = homePage.navigate();

  await expect(homePage.getLoadingMessage()).toBeVisible();
  await expect(homePage.getArticlePreview(newArticle.title)).toBeHidden();

  releaseResponse();
  await navigation;

  await expect(homePage.getLoadingMessage()).toBeHidden();
  await expect(homePage.getArticlePreview(newArticle.title)).toBeVisible();
});
