import { DAYS_OF_THE_WEEK } from "../utils";

export interface Course {
  id: string;
  courseName: string;
  startDate: string;
  endDate: string;
  students?: Student[];
  enrollments?: string[];
  daysOfTheWeek: DaysOfTheWeek;
}

export interface Student {
  id: string;
  displayName: string;
  email: string;
}

export type DaysOfTheWeek = {
  [key in DAYS_OF_THE_WEEK]: {
    isActive: boolean;
    startTime: string;
    endTime: string;
  };
};