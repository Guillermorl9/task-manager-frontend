import { Task } from './Task';
export interface TaskList {
  id?: number,
  title: string,
  tasks: Task[],
}
