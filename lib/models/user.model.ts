import { UserType } from "./user-type.enum";

export interface UserInformation {
  id: string;
  displayName: string;
  email: string;
}
export interface User extends UserInformation {
  userType: UserType;
}
