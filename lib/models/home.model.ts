import { Course } from "./course.model";
import { Session } from "./session.model";
import { User } from "./user.model";

export interface Home {
  user: User;
  myCourses: Course[];
  mySessions: Session[];
  todaysSessions: Session[];
  todayKey: string;
}
