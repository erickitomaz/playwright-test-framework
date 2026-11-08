import { test, expect } from "@playwright/test";
import {
  buildArticle,
  buildUser,
  createArticle,
  createUser,
  getArticleBySlug,
} from "@support";

test("a created article can be read by its slug", async ({ request }) => {
  const newAuthor = buildUser();
  const createdAuthor = await createUser(request, newAuthor);

  const newArticle = buildArticle();
  const createdArticle = await createArticle(request, createdAuthor.token, newArticle);

  const fetchedArticle = await getArticleBySlug(request, createdArticle.slug);

  expect(fetchedArticle).toMatchObject({
    title: newArticle.title,
    description: newArticle.description,
    body: newArticle.body,
    tagList: newArticle.tagList,
  });
  expect(fetchedArticle.author.username).toBe(newAuthor.username);
});
