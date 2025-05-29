import {Category} from "./Category";

export interface UserApp {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  photoUrl: string;
  categories?: Category[];
}
