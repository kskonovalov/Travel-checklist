import { getRandomKey, maybePrepareTask } from './helpers';

describe('getRandomKey test', () => {
  it('It should generate non-empty string by default', () => {
    const randomKey: string = getRandomKey();
    expect(randomKey.length).toBeGreaterThan(0);
  });
  it('Length of generated key should be same as param we passed', () => {
    const keyLength = 10;
    const randomKey: string = getRandomKey(keyLength);
    expect(randomKey.length).toEqual(keyLength);
  });
});

describe('maybePrepareTask test', () => {
  it('It should create from string', () => {
    const task: string = 'String task';
    const result = maybePrepareTask(task);
    expect(result).toEqual({ completed: false, value: 'String task' });
  });
});
