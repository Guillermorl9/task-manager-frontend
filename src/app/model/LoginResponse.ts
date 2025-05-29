import {UserApp} from "./UserApp";

export interface LoginResponse {
  token: string;
  user: UserApp;
}
