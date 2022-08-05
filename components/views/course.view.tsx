import { Course, Student, Teacher } from "../../lib/models/course.model";
import { UserType } from "../../lib/models/user-type.enum";
import { DAYS_OF_THE_WEEK } from "../../lib/utils";
import { UserTypeAvatar } from "../user-type-avatar";

export const CourseView = ({ course, isShort }: any) => {
  return (
    <>
      <h5 className="card-title mb-3">{course?.courseName}</h5>
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <p>
            <i className="bi bi-calendar4-range me-2"></i>
            {course?.startDate} <i className="bi bi-dash "></i>
            {course?.endDate}
            {course?.teachers?.count}
          </p>
          {!isShort && (
            <>
              <div className="medium text-muted mb-2">Teachers:</div>
              <div className="row mb-3">
                {course?.teachers?.map((teacher: Teacher) => (
                  <div key={teacher.id} className="col col-md-6">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-lg">
                        <UserTypeAvatar userType={UserType.Teacher} />
                      </div>
                      <div className="ms-3">
                        <div className="fs-5 text-dark fw-500">
                          {teacher.displayName}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!isShort && (
            <>
              <div className="medium text-muted mb-2">Student:</div>
              <div className="row mb-3">
                {course?.students?.map((student: Student) => (
                  <div key={student.id} className="col col-md-6">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-lg">
                        <UserTypeAvatar userType={UserType.Student} />
                      </div>
                      <div className="ms-3">
                        <div className="fs-5 text-dark fw-500">
                          {student.displayName}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="col-md-12  col-lg-6">
          <div className="medium text-muted mb-2">Sessions:</div>
          {Object.values(DAYS_OF_THE_WEEK).map(
            (dayOfTheWeek: DAYS_OF_THE_WEEK) =>
              course?.daysOfTheWeek[dayOfTheWeek].isActive && (
                <p key={dayOfTheWeek}>
                  <i className="bi bi-calendar-event me-2"></i>
                  {`${dayOfTheWeek}:`}{" "}
                  {course.daysOfTheWeek[dayOfTheWeek].startTime}
                  <i className="bi bi-dash "></i>
                  {course.daysOfTheWeek[dayOfTheWeek].endTime}
                </p>
              )
          )}
        </div>
      </div>
    </>
  );
};

export const CoursesView = ({ courses, isShort }: any) => {
  return (
    courses && (
      <>
        <h2> Course List</h2>
        {courses?.map((course: Course) => (
          <div key={course.id}>
            <CourseView course={course} isShort={isShort}></CourseView>
          </div>
        ))}
      </>
    )
  );
};
