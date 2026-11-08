import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
import type { User } from "@support/models";

export function buildUser(overrides: Partial<User> = {}): User {
  const username = `${faker.person.firstName().toLowerCase()}_${randomUUID().slice(0, 8)}`;
  return {
    username,
    email: `${username}@example.com`,
    password: faker.internet.password({ length: 12 }),
    ...overrides,
  };
}
