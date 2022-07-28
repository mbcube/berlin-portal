import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useForm } from "react-hook-form";
import { database } from "../../lib/firebase";
import { Student, Teacher } from "../../lib/models/course.model";
import { UserType } from "../../lib/models/user-type.enum";
import { DATE_FORMAT, DATE_REGEX, DAYS_OF_THE_WEEK } from "../../lib/utils";

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
        message: "start date is after end date;",
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
      <label>Course Name</label>
      <input
        type="text"
        {...register("courseName", {
          required: true,
          minLength: 5,
        })}
      />
      {errors.courseName && (
        <span style={{ color: "red" }}>Course name is missing or invalid.</span>
      )}
      <br />
      <br />
      <label>Start Date</label>
      <input
        type="date"
        {...register("startDate", {
          required: true,
          pattern: DATE_REGEX,
        })}
      />
      -
      <input
        type="date"
        {...register("endDate", {
          required: true,
          pattern: DATE_REGEX,
        })}
      />
      {errors.startDate && (
        <span style={{ color: "red" }}>
          {errors.startDate?.message || "Start Date is missing or invalid"}
        </span>
      )}
      {errors.endDate && (
        <span style={{ color: "red" }}>End Date is missing or invalid</span>
      )}
      <br />
      <br />
      <label>Assign a Teacher</label>
      <Typeahead
        id="basic-typeahead-multiple"
        size="sm"
        labelKey={(teacher: any) => `${teacher.displayName}`}
        className="form-control"
        multiple
        onChange={setTeacherMultiSelections}
        options={allTeachers}
        placeholder="Select a teacher..."
        selected={teacherMultiSelections}
        maxResults={5}
        paginate={false}
      />
      <br />
      <label>Class Times</label>
      <div className="d-flex flex-column align-items-left">
        {watchAllFields &&
          Object.values(DAYS_OF_THE_WEEK).map((dayOfWeek: DAYS_OF_THE_WEEK) => (
            <div key={dayOfWeek} className="d-flex align-items-center">
              <input
                className="mr-1"
                {...register(`daysOfTheWeek.${dayOfWeek}.isActive`)}
                checked={getValues().daysOfTheWeek[dayOfWeek].isActive}
                onChange={() =>
                  setValue(`daysOfTheWeek.${dayOfWeek}`, {
                    ...getValues().daysOfTheWeek[dayOfWeek],
                    isActive: !getValues().daysOfTheWeek[dayOfWeek].isActive,
                  } as never)
                }
                type="checkbox"
              />
              <label className="mx-1"> {dayOfWeek} </label>
              {getValues().daysOfTheWeek[dayOfWeek].isActive && (
                <>
                  :
                  <input
                    type="time"
                    {...register(`daysOfTheWeek.${dayOfWeek}.startTime`, {
                      required: getValues().daysOfTheWeek[dayOfWeek].isActive,
                    })}
                  />
                  -
                  <input
                    type="time"
                    {...register(`daysOfTheWeek.${dayOfWeek}.endTime`, {
                      required: getValues().daysOfTheWeek[dayOfWeek].isActive,
                    })}
                  />
                </>
              )}
              {errors.daysOfTheWeek && errors.daysOfTheWeek[dayOfWeek] && (
                <span style={{ color: "red" }}>
                  {errors.daysOfTheWeek[dayOfWeek]?.startTime?.message ||
                    `Course time is missing or invalid for ${dayOfWeek}`}
                </span>
              )}
            </div>
          ))}
      </div>
      <br />
      <label>Add Students</label>
      <Typeahead
        id="basic-typeahead-multiple"
        labelKey={(student: any) => `${student.displayName}`}
        className="form-control"
        size="sm"
        multiple
        onChange={setStudentMultiSelections}
        options={allStudents}
        placeholder="Select your students..."
        selected={studentMultiSelections}
        maxResults={5}
        paginate={false}
      />
      <br />
      <input className="btn btn-dark" type="submit" value="Submit" />
    </form>
  );
}
