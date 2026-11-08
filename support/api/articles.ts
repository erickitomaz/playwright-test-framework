import type { APIRequestContext } from "@playwright/test";
import { apiUrl } from "@support/config";
import type { Article } from "@support/models";
import { authHeader, readJson } from "@support/lib";

export interface CreateArticleResponse {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  author: { username: string };
}

export async function createArticle(
  request: APIRequestContext,
  token: string,
  article: Article,
): Promise<CreateArticleResponse> {
  const response = await request.post(`${apiUrl}/articles`, {
    data: { article },
    headers: authHeader({ token }),
  });

  const body = await readJson(response, "create article");
  return body.article;
}

export interface GetArticleBySlugResponse {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  author: { username: string };
}

export async function getArticleBySlug(
  request: APIRequestContext,
  slug: string,
): Promise<GetArticleBySlugResponse> {
  const response = await request.get(`${apiUrl}/articles/${slug}`);
  const body = await readJson(response, "get article by slug");
  return body.article;
}
