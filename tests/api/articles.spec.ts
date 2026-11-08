import {
  buildArticle,
  createArticle,
  expect,
  getArticleBySlug,
  test,
} from "@support";

test("a created article can be read by its slug", async ({ request, currentUser }) => {
  const newArticle = buildArticle();

  const createdArticle = await createArticle(request, currentUser.token, newArticle);
  const fetchedArticle = await getArticleBySlug(request, createdArticle.slug);

  expect(fetchedArticle).toMatchObject({
    title: newArticle.title,
    description: newArticle.description,
    body: newArticle.body,
    tagList: newArticle.tagList,
  });
  expect(fetchedArticle.author.username).toBe(currentUser.username);
});
