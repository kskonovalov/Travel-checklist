import taskInterface from './interfaces/taskInterface';

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

/**
 * @param task
 */
const maybePrepareTask = (
  task:
    | string
    | {
        id?: string;
        value?: string;
        completed?: boolean;
      }
): taskInterface => {
  if (typeof task === 'string') {
    return {
      id: getRandomKey(),
      value: task,
      completed: false
    };
  }
  return {
    ...task,
    id: task.id || getRandomKey(),
    value: task.value || '',
    completed: task.completed || false
  };
};

export { maybePrepareTask };
