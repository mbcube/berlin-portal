import { UserInfo as FirebaseUser } from "firebase/auth";
import { UserType } from "./user-type.enum";

export interface User extends FirebaseUser {
  displayName: string;
  userType: UserType;
}
