import { Page, Locator } from 'playwright/test';
import { FindReturnType } from '../types';
import { API_URL } from '../utils';

export interface FindBlockToFilterCharacterPage {
  'status-dropdown': () => {
    dropdown: Locator;
    option: (option: string) => Locator;
  };
  'gender-dropdown': () => {
    dropdown: Locator;
    option: (option: string) => Locator;
  };
  'save-btn': () => Locator;
  'reset-btn': () => Locator;
  'character-card': () => Locator;
  'info-card': () => Locator;
  'more-btn': () => Locator;
}
export type FindBlockToCharacterPage = keyof FindBlockToFilterCharacterPage;

export class CharacterPage {
  protected readonly statusDropdownLabel = 'Select a status character';
  protected readonly genderDropdownLabel = 'Select a gender character';
  constructor(protected readonly page: Page) {}

  public find<T extends FindBlockToCharacterPage>(blockKey: T): FindReturnType<FindBlockToFilterCharacterPage[T]> {
    return this.baseFindBlocks[blockKey]() as FindReturnType<FindBlockToFilterCharacterPage[T]>;
  }

  public async waitRequest(params: string = '') {
    const request = await this.page.waitForRequest((request) => {
      return request.url().startsWith(API_URL) && request.url().includes(params);
    });

    return await request.response();
  }

  private get baseFindBlocks(): FindBlockToFilterCharacterPage {
    const { page, statusDropdownLabel, genderDropdownLabel } = this;

    return {
      'status-dropdown': () => ({
        dropdown: page.getByLabel(statusDropdownLabel),
        option: (option: string) => page.getByLabel(option, { exact: true }),
      }),
      'gender-dropdown': () => ({
        dropdown: page.getByLabel(genderDropdownLabel),
        option: (option: string) => page.getByLabel(option, { exact: true }),
      }),
      'save-btn': () => page.locator('button', { hasText: 'Save' }),
      'reset-btn': () => page.locator('button', { hasText: 'Reset' }),
      'character-card': () => page.locator('[data-testid="character-card"]'),
      'info-card': () => page.locator('[data-testid="info-card"]'),
      'more-btn': () => page.locator('button', { hasText: 'Show more' }),
    };
  }
}
