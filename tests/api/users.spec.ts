import { test, expect } from "@playwright/test";
import { buildUser, createUser, loginUser } from "@support";

test("a created user can log in", async ({ request }) => {
  const newUser = buildUser();
  await createUser(request, newUser);

  const loggedInUser = await loginUser(request, newUser);

  expect(loggedInUser).toMatchObject({ email: newUser.email, username: newUser.username });
});
