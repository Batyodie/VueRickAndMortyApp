import { expect, Page, test } from './fixtures/';
import { CharacterPage } from './fixtures/characterPage';

async function testSingleFilter(
  page: Page,
  characterPage: CharacterPage,
  filterType: 'status' | 'gender',
  filterValue: string,
  paramsWait: string,
) {
  await page.goto('/');
  await page.waitForLoadState('load');
  const filter = filterType === 'status' ? 'status-dropdown' : 'gender-dropdown';

  const { dropdown, option } = characterPage.find(filter);
  await expect(dropdown).toBeVisible();

  await dropdown.click();

  const currentFilterOption = option(filterValue);
  await expect(currentFilterOption).toBeVisible();

  await currentFilterOption.click();

  const saveButton = characterPage.find('save-btn');
  await expect(saveButton).toBeVisible();
  await expect(saveButton).not.toBeDisabled();
  await saveButton.click();
  await expect(saveButton).toBeDisabled();

  const response = await characterPage.waitRequest(paramsWait);

  expect(response.status()).toEqual(200);
  await page.waitForURL((url) => {
    return url.search.includes(paramsWait);
  });
}

async function testMultiFilter(
  page: Page,
  characterPage: CharacterPage,
  filterOne: string,
  filterTwo: string,
  paramsWait: string,
) {
  const { dropdown: statusDropdown, option: statusOption } = characterPage.find('status-dropdown');
  const { dropdown: genderDropdown, option: genderOption } = characterPage.find('gender-dropdown');
  await expect(statusDropdown).toBeVisible();

  await statusDropdown.click();

  const currentStatusOption = statusOption(filterOne);
  await expect(currentStatusOption).toBeVisible();

  await currentStatusOption.click();

  await expect(genderDropdown).toBeVisible();

  await genderDropdown.click();

  const currentGenderOption = genderOption(filterTwo);
  await expect(currentGenderOption).toBeVisible();

  await currentGenderOption.click();

  const saveButton = characterPage.find('save-btn');
  await expect(saveButton).toBeVisible();
  await expect(saveButton).not.toBeDisabled();
  await saveButton.click();
  await expect(saveButton).toBeDisabled();

  const response = await characterPage.waitRequest(paramsWait);

  expect(response.status()).toEqual(200);
  await page.waitForURL((url) => {
    return url.search.includes(paramsWait);
  });
}

test.describe('Rick and Morty tests "Filter panel" buttons', () => {
  test('Selecting status "Dead" status and clicking "Save" sends correct request to backend', async ({
    page,
    characterPage,
  }) => {
    await testSingleFilter(page, characterPage, 'status', 'Dead', 'status=Dead');
  });

  test('Selecting status "Alive" status and clicking "Save" sends correct request to backend', async ({
    page,
    characterPage,
  }) => {
    await testSingleFilter(page, characterPage, 'status', 'Alive', 'status=Alive');
  });

  test('Selecting status "unknown" status and clicking "Save" sends correct request to backend', async ({
    page,
    characterPage,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    await testSingleFilter(page, characterPage, 'status', 'unknown', 'status=unknown');
  });

  test('Selecting gender "Female" status and clicking "Save" sends correct request to backend', async ({
    page,
    characterPage,
  }) => {
    await testSingleFilter(page, characterPage, 'gender', 'Female', 'gender=Female');
  });

  test('Selecting gender "Male" status and clicking "Save" sends correct request to backend', async ({
    page,
    characterPage,
  }) => {
    await testSingleFilter(page, characterPage, 'gender', 'Male', 'gender=Male');
  });

  test('Selecting gender "Genderless" status and clicking "Save" sends correct request to backend', async ({
    page,
    characterPage,
  }) => {
    await testSingleFilter(page, characterPage, 'gender', 'Genderless', 'gender=Genderless');
  });

  test('Selecting gender "unknown" status and clicking "Save" sends correct request to backend', async ({
    page,
    characterPage,
  }) => {
    await testSingleFilter(page, characterPage, 'gender', 'unknown', 'gender=unknown');
  });

  test('Multi Selecting filters "Dead" / "Male" and clicking "Save" sends correct request to backend', async ({
    page,
    characterPage,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    await testMultiFilter(page, characterPage, 'Dead', 'Male', 'status=Dead&gender=Male');
  });

  test('Multi Selecting filters "Alive" / "Female" and clicking "Save" sends correct request to backend', async ({
    page,
    characterPage,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    await testMultiFilter(page, characterPage, 'Alive', 'Female', 'status=Alive&gender=Female');
  });

  test('Multi Selecting filters "unknown" / "Genderless" and clicking "Save" sends correct request to backend', async ({
    page,
    characterPage,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    await testMultiFilter(page, characterPage, 'unknown', 'Genderless', 'status=unknown&gender=Genderless');
  });

  test('Reset multi selecting filters "unknown" / "Genderless"', async ({ page, characterPage }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    await testMultiFilter(page, characterPage, 'unknown', 'Genderless', 'status=unknown&gender=Genderless');

    const resetBtn = characterPage.find('reset-btn');

    expect(resetBtn).toBeVisible();
    expect(resetBtn).not.toBeDisabled();

    await resetBtn.click();

    const response = await characterPage.waitRequest('');

    expect(response.status()).toEqual(200);

    await testMultiFilter(page, characterPage, 'unknown', 'Genderless', 'status=unknown&gender=Genderless');
  });
});
