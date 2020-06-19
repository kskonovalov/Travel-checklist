import { getRandomKey } from './helpers';

describe('getRandomKey test', () => {
  it('It should generate non-empty string by default', () => {
    const randomKey: string = getRandomKey();
    expect(randomKey.length).toBeGreaterThan(0);
  });
  it('Length of generated key should be same as param we passed', () => {
    const keyLength = 13;
    const randomKey: string = getRandomKey(keyLength);
    expect(randomKey.length).toEqual(keyLength);
  });
});
