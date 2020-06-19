/**
 * Generates string of random characters with max length of @length
 * During to used algorythm limitation, max string length could be 11 symbols
 * (more than enough for use case)
 *
 * @param length = 7
 */
const getRandomKey = (length: number = 7): string => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export { getRandomKey };
