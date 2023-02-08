import { Task } from '../../../boards/models/task.interface';

export interface TasksState {
  tasks: Task[];
  error: string;
}

export const initialTasksState: TasksState = {
  tasks: [],
  error: '',
};
