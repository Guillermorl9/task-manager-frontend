import {TaskList} from "./TaskList";

export interface Category {
  title: string;
  icon: string;
  lists: TaskList[];
}
