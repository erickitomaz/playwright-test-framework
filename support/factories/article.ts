import { faker } from '@faker-js/faker';
import type { Article } from '@support/models';

export function buildArticle(overrides: Partial<Article> = {}): Article {
  return {
    title: faker.lorem.words({ min: 3, max: 6 }),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(2),
    tagList: ['qa'],
    ...overrides,
  };
}
