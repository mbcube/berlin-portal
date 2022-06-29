import { UserType } from "./user-type.enum";

export interface User {
  id: string;
  displayName: string;
  userType: UserType;
  email: string;
}
