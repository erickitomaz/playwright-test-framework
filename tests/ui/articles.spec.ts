import { test, expect, buildArticle, getArticleBySlug } from "@support";

test("a user can publish an article from the editor", async ({
  app,
  request,
  currentUser,
}) => {
  const newArticle = buildArticle();
  const editorPage = app.getEditorPage();

  await editorPage.navigate();
  const publishedArticle = await editorPage
    .setTitle(newArticle.title)
    .setDescription(newArticle.description)
    .setBody(newArticle.body)
    .setTags(newArticle.tagList)
    .publish();

  const fetchedArticle = await getArticleBySlug(request, publishedArticle.slug);
  expect(fetchedArticle).toMatchObject({
    title: newArticle.title,
    description: newArticle.description,
    body: newArticle.body,
    tagList: newArticle.tagList,
  });
  expect(fetchedArticle.author.username).toBe(currentUser.username);
  await expect(app.getArticlePage().getTitle()).toHaveText(newArticle.title);
});
