import {TaskList} from "./TaskList";

export interface Category {
  id?: number,
  title: string;
  icon: string;
  lists: TaskList[];
}
