import taskInterface from './interfaces/taskInterface';
import { addList } from './store/actions';

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
        value?: string;
        completed?: boolean;
      }
): taskInterface => {
  if (typeof task === 'string') {
    return {
      value: task,
      completed: false
    };
  }
  return {
    ...task,
    value: task.value || '',
    completed: task.completed || false
  };
};

export { maybePrepareTask };

const fillWithDefaultLists = ({ dispatch }: any) => {
  const savedLists = JSON.parse(localStorage.getItem('lists') || '[]');
  if (savedLists.length > 0) {
    Object.keys(savedLists).forEach((key: string) => {
      dispatch(
        addList({
          listId: key,
          listTitle: savedLists[key].listTitle,
          tasks: savedLists[key].tasks
        })
      );
    });
    return;
  }
  const defaultLists =
    typeof window.__DATA__.lists !== 'undefined' ? window.__DATA__.lists : {};

  Object.keys(defaultLists).forEach((key: string) => {
    dispatch(
      addList({
        listId: getRandomKey(),
        listTitle: key,
        tasks: defaultLists[key].reduce(function(
          result: {
            [taskId: string]: taskInterface;
          },
          item: any
        ) {
          result[getRandomKey()] = maybePrepareTask(item);
          return result;
        }, {})
      })
    );
  });
};

export { fillWithDefaultLists };
