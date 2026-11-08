import { test, expect, loginUser } from "@support";

test("the current user can log in", async ({ request, currentUser }) => {
  const loggedInUser = await loginUser(request, currentUser);

  expect(loggedInUser).toMatchObject({
    email: currentUser.email,
    username: currentUser.username,
  });
});
