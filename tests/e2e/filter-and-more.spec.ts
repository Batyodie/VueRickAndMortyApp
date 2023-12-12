import { expect, test } from './fixtures/';

test.describe('Rick and Morty tests "Show more" and "Filter" manipulation button', () => {
  test('Checking basic page addition before adding filters', async ({ page, characterPage }) => {
    page.goto('/');
    await page.waitForLoadState('load');

    await characterPage.find('status-dropdown').dropdown.click();
    await characterPage.find('status-dropdown').option('Alive').click();

    await characterPage.find('gender-dropdown').dropdown.click();
    await characterPage.find('gender-dropdown').option('Male').click();

    await characterPage.find('save-btn').click();

    const firstResp = await characterPage.waitRequest('status=Alive&gender=Male');

    expect(firstResp.status()).toBe(200);
    await page.waitForURL((url) => {
      return url.search.includes('status=Alive&gender=Male');
    });

    await characterPage.find('more-btn').click();

    const secondResp = await characterPage.waitRequest('status=Alive&gender=Male&page=2');

    expect(secondResp.status()).toBe(200);
    await page.waitForURL((url) => {
      return url.search.includes('status=Alive&gender=Male&page=2');
    });

    await characterPage.find('more-btn').click();

    const thirdResp = await characterPage.waitRequest('status=Alive&gender=Male&page=3');

    expect(thirdResp.status()).toBe(200);
    await page.waitForURL((url) => {
      return url.search.includes('status=Alive&gender=Male&page=3');
    });
  });

  test('We check that the page is reset to the first one if we have changed the filter parameters', async ({
    page,
    characterPage,
  }) => {
    page.goto('/');
    await page.waitForLoadState('load');

    await characterPage.find('more-btn').click();

    await characterPage.find('status-dropdown').dropdown.click();
    await characterPage.find('status-dropdown').option('Alive').click();

    await characterPage.find('gender-dropdown').dropdown.click();
    await characterPage.find('gender-dropdown').option('Male').click();

    await characterPage.find('save-btn').click();

    const resp = await characterPage.waitRequest('status=Alive&gender=Male');

    expect(resp.status()).toBe(200);
    await page.waitForURL((url) => {
      return url.search.includes('page=1&status=Alive&gender=Male');
    });

    await characterPage.find('more-btn').click();

    const resp2 = await characterPage.waitRequest('status=Alive&gender=Male&page=2');
    expect(resp2.status()).toBe(200);
    await page.waitForURL((url) => {
      return url.search.includes('page=2&status=Alive&gender=Male');
    });
  });

  test('We check that the state has been reset after clicking the reset button, if we interacted with the filter and the more button', async ({
    page,
    characterPage,
  }) => {
    page.goto('/');
    await page.waitForLoadState('load');

    await characterPage.find('status-dropdown').dropdown.click();
    await characterPage.find('status-dropdown').option('Alive').click();

    await characterPage.find('gender-dropdown').dropdown.click();
    await characterPage.find('gender-dropdown').option('Male').click();

    await characterPage.find('save-btn').click();

    await characterPage.find('more-btn').click();

    await characterPage.find('more-btn').click();

    await characterPage.find('reset-btn').click();

    const resp = await characterPage.waitRequest('');

    expect(resp.status()).toBe(200);
    await page.waitForURL((url) => {
      return url.search === '';
    });
  });
});
