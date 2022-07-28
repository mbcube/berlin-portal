import { DAYS_OF_THE_WEEK } from "../utils";
import { UserInformation } from "./user.model";

export interface Course {
  id: string;
  courseName: string;
  startDate: string;
  endDate: string;
  students?: Student[];
  teachers?: Teacher[];
  enrollments?: string[];
  daysOfTheWeek: DaysOfTheWeek;
}

export interface Teacher extends UserInformation {}

export interface Student extends UserInformation {}

export interface Teacher {}

export type DaysOfTheWeek = {
  [key in DAYS_OF_THE_WEEK]: {
    isActive: boolean;
    startTime: string;
    endTime: string;
  };
};
