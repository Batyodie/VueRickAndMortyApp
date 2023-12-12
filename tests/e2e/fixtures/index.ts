import { Page, test as base } from '@playwright/test';
import { CharacterPage } from './characterPage';

export interface Fixtures {
  characterPage: CharacterPage;
}

const initCharacterPage = (page: Page): CharacterPage => new CharacterPage(page);

export * from '@playwright/test';
export const test = base.extend<Fixtures>({
  characterPage: async ({ page }, use): Promise<void> => {
    await use(initCharacterPage(page));
  },
});
