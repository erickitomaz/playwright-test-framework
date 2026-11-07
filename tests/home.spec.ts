import { test, expect } from '@playwright/test';

test('home shows the global feed that matches the articles API', async ({ page }) => {
  const [response] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes('/api/articles') &&
        res.request().method() === 'GET' &&
        res.ok(),
    ),
    page.goto('/'),
  ]);
  const { articlesCount } = await response.json();

  await expect(page.getByText('Global Feed')).toBeVisible();
  await expect(page.getByText('No articles are here... yet.')).toBeVisible({
    visible: articlesCount === 0,
  });
});
