import { test, expect } from '@playwright/test';
import { API_URL } from './utils';

test.describe('Rick and Morty tests "Show more" button', () => {
  test('Clicking "Show more" sends request to API with incremented page number', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    const showMoreButton = page.locator('button', { hasText: 'Show more' });

    await expect(showMoreButton).toBeVisible();

    await showMoreButton.click();
    expect(await showMoreButton.isDisabled()).toBe(true);

    const request = await page.waitForRequest((request) => {
      return request.url().startsWith(API_URL) && request.url().includes('page=2');
    });
    const response = await request.response();

    await expect(response.status()).toEqual(200);
    expect(await showMoreButton.isDisabled()).toBe(false);
    await page.waitForURL((url) => {
      return url.search.includes('page=2');
    });

    const characterCards = page.locator('[data-testid="character-card"]');
    await expect(characterCards).toHaveCount(40);
  });

  test('Clicking "Show more" multiple times sends requests to API with incremented page numbers', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    const showMoreButton = page.locator('button', { hasText: 'Show more' });

    await expect(showMoreButton).toBeVisible();

    for (let pageNumber = 2; pageNumber <= 4; pageNumber++) {
      await showMoreButton.click();
      expect(await showMoreButton.isDisabled()).toBe(true);

      const request = await page.waitForRequest((request) => {
        return request.url().startsWith(API_URL) && request.url().includes(`page=${pageNumber}`);
      });
      const response = await request.response();

      await expect(response.status()).toEqual(200);
      expect(await showMoreButton.isDisabled()).toBe(false);
      await page.waitForURL((url) => {
        return url.search.includes(`page=${pageNumber}`);
      });
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
