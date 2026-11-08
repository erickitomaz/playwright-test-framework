import { test as baseTest } from "@playwright/test";
import { createUser, type CreateUserResponse } from "@support/api";
import { buildUser } from "@support/factories";

interface DefaultFixtures {
  currentUser: CreateUserResponse;
}

export * from "@playwright/test";
export const test = baseTest.extend<DefaultFixtures>({
  currentUser: async ({ request }, use) => {
    const newUser = buildUser();
    const createdUser = await createUser(request, newUser);
    await use(createdUser);
  },

  storageState: async ({ currentUser, baseURL }, use) => {
    if (!baseURL) {
      throw new Error("baseURL is required to build the storage state");
    }

    await use({
      cookies: [],
      origins: [
        {
          origin: new URL(baseURL).origin,
          localStorage: [{ name: "jwtToken", value: currentUser.token }],
        },
      ],
    });
  },
});
