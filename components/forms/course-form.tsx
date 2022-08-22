import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
// import { Typeahead } from "react-bootstrap-typeahead";
import { useForm } from "react-hook-form";
import { database } from "../../lib/firebase";
import { Student, Teacher } from "../../lib/models/course.model";
import { UserType } from "../../lib/models/user-type.enum";
import { DATE_FORMAT, DATE_REGEX, DAYS_OF_THE_WEEK } from "../../lib/utils";
import { UserTypeAvatar } from "../user-type-avatar";
import CustomTypeahead from "./custom-typeahead";

export default function CourseForm({
  onCourseFormSubmitted,
  initialFormData,
  initialStudentSelection,
  initialTeacherSelection,
}: any) {
  const [studentMultiSelections, setStudentMultiSelections] = useState<any>([]);
  const [teacherMultiSelections, setTeacherMultiSelections] = useState<any>([]);

  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormData,
  });

  const watchAllFields = watch("daysOfTheWeek");

  useEffect(() => {
    setStudentMultiSelections(initialStudentSelection || []);
  }, [initialStudentSelection]);

  useEffect(() => {
    setTeacherMultiSelections(initialTeacherSelection || []);
  }, [initialTeacherSelection]);

  useEffect(() => {
    reset(initialFormData);
  }, [initialFormData, reset]);

  useEffect(() => {
    const getUsers = async () => {
      const userDocuments = await getDocs(
        query(
          collection(database, "users"),
          where("userType", "!=", UserType.Admin)
        )
      );
      const users = userDocuments.docs.map((document) => ({
        id: document.id,
        displayName: document.data().displayName,
        email: document.data().email,
        userType: document.data().userType,
      }));

      const students = users.filter(
        (user) => user.userType == UserType.Student
      );
      const teachers = users.filter(
        (user) => user.userType == UserType.Teacher
      );

      setAllStudents(students);
      setAllTeachers(teachers);
    };

    getUsers();
  }, []);

  function validateDates(startDate: string, endDate: string): boolean {
    const startMoment = moment(startDate, DATE_FORMAT);
    const endMoment = moment(endDate, DATE_FORMAT);

    return startMoment.isSameOrBefore(endMoment);
  }

  function validateDaysOfTheWeek(): boolean {
    var valid = true;
    const daysOfTheWeek = getValues().daysOfTheWeek;
    for (var dayOfTheWeek of Object.values(
      DAYS_OF_THE_WEEK
    ) as DAYS_OF_THE_WEEK[]) {
      if (
        daysOfTheWeek[dayOfTheWeek] &&
        daysOfTheWeek[dayOfTheWeek].endTime <
          daysOfTheWeek[dayOfTheWeek].startTime
      ) {
        setError(`daysOfTheWeek.${dayOfTheWeek}.startTime`, {
          type: "manual",
          message: "start time is after end time",
        });

        valid = false;
      }
    }

    return valid;
  }

  async function onCreateCourse(formData: any) {
    if (!validateDates(formData.startDate, formData.endDate)) {
      setError("startDate", {
        type: "manual",
        message: "Start date is after end date",
      });
      return;
    }

    if (!validateDaysOfTheWeek()) {
      return;
    }

    onCourseFormSubmitted(
      formData,
      studentMultiSelections.map(
        (selection: any) =>
          ({
            id: selection.id,
            displayName: selection.displayName,
            email: selection.email,
          } as Student)
      ),
      teacherMultiSelections.map(
        (selection: any) =>
          ({
            id: selection.id,
            displayName: selection.displayName,
            email: selection.email,
          } as Teacher)
      )
    );
  }

  return (
    <form className="form-group" onSubmit={handleSubmit(onCreateCourse)}>
      {/* Form Row*/}
      <div className="row gx-3 mb-3">
        {/* Form Group (first name)*/}
        <div className="col col-lg-6">
          <section className="mb-3">
            <label className="small mb-1">Course Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter course name"
              {...register("courseName", {
                required: true,
                minLength: 5,
              })}
            />
            {errors.courseName && (
              <span style={{ color: "red" }}>
                Course name is missing or invalid.
              </span>
            )}
          </section>

          <section className="mb-3">
            <label className="small mb-1">Start Date</label>
            <div className="d-flex align-items-center justify-content-between">
              <i className="bi bi-calendar4-range me-2"></i>
              <input
                className="form-control"
                type="date"
                {...register("startDate", {
                  required: true,
                  pattern: DATE_REGEX,
                })}
              />
              <i className="bi bi-dash "></i>
              <input
                className="form-control"
                type="date"
                {...register("endDate", {
                  required: true,
                  pattern: DATE_REGEX,
                })}
              />
            </div>
            {errors.startDate && (
              <span style={{ color: "red" }}>
                {errors.startDate?.message ||
                  "Start Date is missing or invalid"}
              </span>
            )}
            {errors.endDate && (
              <span style={{ color: "red" }}>
                End Date is missing or invalid
              </span>
            )}
          </section>

          <section className="mb-3">
            <label className="small mb-1">Assign a Teacher</label>
            <CustomTypeahead
              className="mb-3"
              id="basic-typeahead-multiple"
              size="sm"
              labelKey={(teacher: any) => `${teacher.displayName}`}
              onChange={(teacher: Teacher) => {
                if (
                  !!teacherMultiSelections.find(
                    (t: Teacher) => t.id === teacher.id
                  )
                )
                  return;
                setTeacherMultiSelections([...teacherMultiSelections, teacher]);
              }}
              options={allTeachers}
              placeholder="Select a teacher..."
              maxResults={5}
              paginate={false}
            />
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              {teacherMultiSelections?.map((teacher: Teacher) => (
                <div
                  key={teacher.id}
                  className="d-flex align-items-center flex-shrink-0 me-3"
                >
                  <div className="avatar avatar-xl me-3 bg-gray-200">
                    <UserTypeAvatar userType={UserType.Teacher} />
                  </div>
                  <div className="d-flex flex-column fw-bold">
                    <span className="text-dark line-height-normal mb-1">
                      {teacher.displayName}
                    </span>
                  </div>
                  <div className="dropdown no-caret">
                    <button
                      className="btn btn-transparent-dark btn-icon dropdown-toggle"
                      type="button"
                      onClick={() => {
                        setTeacherMultiSelections(
                          teacherMultiSelections.filter(
                            (t: Teacher) => teacher.id !== t.id
                          )
                        );
                      }}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-3">
            <label className="small mb-1">Add Students</label>
            <CustomTypeahead
              className="mb-3"
              size="sm"
              labelKey={(student: any) => `${student.displayName}`}
              onChange={(student: Student) => {
                if (
                  !!studentMultiSelections.find(
                    (s: Student) => s.id === student.id
                  )
                )
                  return;
                setStudentMultiSelections([...studentMultiSelections, student]);
              }}
              options={allStudents}
              placeholder="Select your students..."
              maxResults={5}
              paginate={false}
            />

            <div className="d-flex align-items-center justify-content-between flex-wrap">
              {studentMultiSelections?.map((student: Student) => (
                <div
                  key={student.id}
                  className="d-flex align-items-center flex-shrink-0 me-3"
                >
                  <div className="avatar avatar-xl me-3 bg-gray-200">
                    <UserTypeAvatar userType={UserType.Student} />
                  </div>
                  <div className="d-flex flex-column fw-bold">
                    <span className="text-dark line-height-normal mb-1">
                      {student.displayName}
                    </span>
                  </div>
                  <div className="dropdown no-caret">
                    <button
                      className="btn btn-transparent-dark btn-icon dropdown-toggle"
                      type="button"
                      onClick={() => {
                        setStudentMultiSelections(
                          studentMultiSelections.filter(
                            (s: Student) => student.id !== s.id
                          )
                        );
                      }}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="col col-offset-2 col-lg-6">
          <section className="mb-3">
            <label className="small mb-1">Class Times</label>
            <div className="d-flex flex-column align-items-left">
              {watchAllFields &&
                Object.values(DAYS_OF_THE_WEEK).map(
                  (dayOfWeek: DAYS_OF_THE_WEEK) => (
                    <>
                      <div
                        key={dayOfWeek}
                        className="d-flex align-items-center justify-content-left  mb-2"
                      >
                        <input
                          className="my-1 me-1 form-check-input"
                          {...register(`daysOfTheWeek.${dayOfWeek}.isActive`)}
                          checked={
                            getValues().daysOfTheWeek[dayOfWeek].isActive
                          }
                          onChange={() =>
                            setValue(`daysOfTheWeek.${dayOfWeek}`, {
                              ...getValues().daysOfTheWeek[dayOfWeek],
                              isActive:
                                !getValues().daysOfTheWeek[dayOfWeek].isActive,
                            } as never)
                          }
                          type="checkbox"
                        />
                        <label className="form-check-label me-2">
                          {dayOfWeek}
                        </label>
                        {getValues().daysOfTheWeek[dayOfWeek].isActive && (
                          <>
                            <input
                              className="form-control form-control-sm w-25"
                              type="time"
                              {...register(
                                `daysOfTheWeek.${dayOfWeek}.startTime`,
                                {
                                  required:
                                    getValues().daysOfTheWeek[dayOfWeek]
                                      .isActive,
                                }
                              )}
                            />
                            <i className="bi bi-dash "></i>
                            <input
                              className="form-control form-control-sm w-25"
                              type="time"
                              {...register(
                                `daysOfTheWeek.${dayOfWeek}.endTime`,
                                {
                                  required:
                                    getValues().daysOfTheWeek[dayOfWeek]
                                      .isActive,
                                }
                              )}
                            />
                          </>
                        )}
                      </div>
                      {errors.daysOfTheWeek && errors.daysOfTheWeek[dayOfWeek] && (
                        <span className="d-block mb-3" style={{ color: "red" }}>
                          {errors.daysOfTheWeek[dayOfWeek]?.startTime
                            ?.message ||
                            `Course time is missing or invalid for ${dayOfWeek}`}
                        </span>
                      )}
                    </>
                  )
                )}
            </div>
          </section>
        </div>
      </div>

      <br />
      <input className="btn btn-primary" type="submit" value="Submit" />
    </form>
  );
}
