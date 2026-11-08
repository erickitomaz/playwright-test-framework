import { test as baseTest } from "@playwright/test";
import { createUser, type CreateUserResponse } from "@support/api";
import { buildUser } from "@support/factories";
import { App } from "@support/pages";

type CurrentUser = CreateUserResponse & { password: string };
interface DefaultFixtures {
  currentUser: CurrentUser;
  app: App;
}

export * from "@playwright/test";
export const test = baseTest.extend<DefaultFixtures>({
  currentUser: async ({ request }, use) => {
    const newUser = buildUser();
    const createdUser = await createUser(request, newUser);
    await use({ ...createdUser, password: newUser.password });
  },

  app: async ({ page }, use) => {
    await use(new App(page));
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
