import { expect } from '@playwright/test';
import { test } from './fixtures';

test.describe('Rick and Morty tests "Show more" button', () => {
  test('Clicking "Show more" sends request to API with incremented page number', async ({ page, characterPage }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    const showMoreButton = characterPage.find('more-btn');

    await expect(showMoreButton).toBeVisible();

    await showMoreButton.click();
    expect(await showMoreButton.isDisabled()).toBe(true);

    const response = await characterPage.waitRequest('page=2');

    await expect(response.status()).toEqual(200);
    await page.waitForURL((url) => {
      return url.search.includes('page=2');
    });
    expect(await showMoreButton.isDisabled()).toBe(false);

    const characterCards = page.locator('[data-testid="character-card"]');
    await expect(characterCards).toHaveCount(40);
  });

  test('Clicking "Show more" multiple times sends requests to API with incremented page numbers', async ({
    page,
    characterPage,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    const showMoreButton = characterPage.find('more-btn');

    await expect(showMoreButton).toBeVisible();

    for (let pageNumber = 2; pageNumber <= 4; pageNumber++) {
      await showMoreButton.click();
      expect(await showMoreButton.isDisabled()).toBe(true);

      const response = await characterPage.waitRequest(`page=${pageNumber}`);

      expect(response.status()).toEqual(200);
      await page.waitForURL((url) => {
        return url.search.includes(`page=${pageNumber}`);
      });
      expect(await showMoreButton.isDisabled()).toBe(false);
    }

    const characterCards = page.locator('[data-testid="character-card"]');
    await expect(characterCards).toHaveCount(80);
  });

  test('Navigating to page with parameter page=3 loads 60 character cards', async ({ page }) => {
    await page.goto('/?page=3');
    await page.waitForLoadState('load');

    const characterCards = page.locator('[data-testid="character-card"]');
    await expect(characterCards).toHaveCount(60);
    await page.waitForURL((url) => {
      return url.search.includes('page=3');
    });
  });
});
