import {Category} from "./Category";

export interface UserApp {
  id?: number;
  name: string;
  email: string;
  photoUrl: string;
  categories?: Category[];
}
