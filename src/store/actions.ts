import {
  SET_LIST_ID,
  ADD_LIST,
  DELETE_LIST,
  TOGGLE_TASK_IN_LIST,
  DELETE_TASK_IN_LIST,
  EDIT_TASK_IN_LIST,
  EMPTY_STORE,
  ADD_TASK_TO_LIST
} from './constants';
import { IActionType, IListAction, ITaskAction } from './interfaces/IActions';

export const setListId = ({
  listId
}: {
  listId: string;
}): IListAction & IActionType => ({
  type: SET_LIST_ID,
  listId
});

export const addList = ({
  tasks,
  listId,
  listTitle
}: IListAction): IListAction & IActionType => ({
  type: ADD_LIST,
  listId,
  listTitle,
  tasks
});

export const toggleTaskInList = ({
  listId,
  taskId
}: ITaskAction): ITaskAction & IActionType => ({
  type: TOGGLE_TASK_IN_LIST,
  listId,
  taskId
});

export const deleteTaskInList = ({
  listId,
  taskId
}: ITaskAction): ITaskAction & IActionType => ({
  type: DELETE_TASK_IN_LIST,
  listId,
  taskId
});

export const editTaskInList = ({
  listId,
  taskId,
  taskText
}: ITaskAction): ITaskAction & IActionType => ({
  type: EDIT_TASK_IN_LIST,
  listId,
  taskId,
  taskText
});

export const addTaskToList = ({
  listId,
  taskText
}: ITaskAction): ITaskAction & IActionType => ({
  type: ADD_TASK_TO_LIST,
  listId,
  taskText
});

export const emptyStore = () => ({
  type: EMPTY_STORE
});
