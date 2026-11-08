import { test, expect } from "@support";

test("a fresh user starts logged in without using the login form", async ({ page, currentUser }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: currentUser.username })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign in" })).toBeHidden();
});
