import { test, expect } from "@support";

test("a fresh user starts logged in without using the login form", async ({ app, currentUser }) => {
  const homePage = app.getHomePage();

  await homePage.navigate();

  await expect(homePage.getUserLink(currentUser.username)).toBeVisible();
  await expect(homePage.getSignInLink()).toBeHidden();
});
