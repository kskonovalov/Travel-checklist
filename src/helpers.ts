const getRandomKey = (length: number = 7): string => {
  return Math.random()
    .toString(36)
    .substring(0, length);
};

export { getRandomKey };
