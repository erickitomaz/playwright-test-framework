import { test, expect, attemptLogin, loginUser } from "@support";

test("the current user can log in", async ({ request, currentUser }) => {
  const loggedInUser = await loginUser(request, currentUser);

  expect(loggedInUser).toMatchObject({
    email: currentUser.email,
    username: currentUser.username,
  });
});

test("login with a wrong password is rejected", async ({ request, currentUser }) => {
  const response = await attemptLogin(request, {
    email: currentUser.email,
    password: "wrong-password",
  });

  expect(response.status()).toBe(401);
  expect(await response.json()).toEqual({ errors: { credentials: ["invalid"] } });
});
