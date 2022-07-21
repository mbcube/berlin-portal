import { Course } from "../../lib/models/course.model";
import { DAYS_OF_THE_WEEK } from "../../lib/utils";

export const CourseView = ({ course }: any) => {
  return (
    <>
      <p> ___ </p>
      <h5> Course : </h5>
      <p>Name: {course?.id}</p>
      <p>Start Date: {course?.startDate}</p>
      <p>End Date: {course?.endDate}</p>
      <h6> Sessions : </h6>
      {Object.values(DAYS_OF_THE_WEEK).map(
        (dayOfTheWeek: DAYS_OF_THE_WEEK) =>
          course?.daysOfTheWeek[dayOfTheWeek].isActive && (
            <p key={dayOfTheWeek}>
              {`- ${dayOfTheWeek}: ${course.daysOfTheWeek[dayOfTheWeek].startTime} - ${course.daysOfTheWeek[dayOfTheWeek].endTime}`}
            </p>
          )
      )}
    </>
  );
};

export const CoursesView = ({ courses }: any) => {
  return (
    courses && (
      <>
        <h2> Course List</h2>
        {courses?.map((course: Course) => (
          <div key={course.id}>
            <CourseView course={course}></CourseView>
          </div>
        ))}
      </>
    )
  );
};
