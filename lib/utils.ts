export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const DATE_REGEX =
  /(?:19\d{2}|20\d{2})[-](?:0[1-9]|1[012])[-](?:0[1-9]|[12][0-9]|3[01])$/;

export const DATE_FORMAT = "YYYY-MM-DD";

export enum DAYS_OF_THE_WEEK {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export const DATE_KEY_FORMAT = "DD-MM-YYYY";

export const PHONE_REGEX = /^[0-9]{10}$/;
