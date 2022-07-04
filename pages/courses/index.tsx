import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthGuard from "../../components/auth-guard";
import { database } from "../../lib/firebase";
import { Course, DaysOfTheWeek, Student } from "../../lib/models/course.model";
import { UserType } from "../../lib/models/user-type.enum";
import { User } from "../../lib/models/user.model";
import { DATE_FORMAT, DATE_REGEX, DAYS_OF_THE_WEEK } from "../../lib/utils";

export default function CreateCourse() {
  const router = useRouter();

  const today = moment().format(DATE_FORMAT);
  const nextMonth = moment().add(30, "day").format(DATE_FORMAT);

  const [multiSelections, setMultiSelections] = useState<any>([]);
  const [allStudents, setAllStudents] = useState<User[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseName: "",
      startDate: today,
      endDate: nextMonth,
      daysOfTheWeek: Object.values(DAYS_OF_THE_WEEK).reduce(
        (previous, current) => ({
          ...previous,
          [current]: { isActive: false, startTime: null, endTime: null },
        }),
        {}
      ) as DaysOfTheWeek,
    },
  });

  const watchAllFields = watch("daysOfTheWeek");

  useEffect(() => {
    const getStudents = async () => {
      const studentDocuments = await getDocs(
        query(
          collection(database, "users"),
          where("userType", "==", UserType.Student)
        )
      );
      const users = studentDocuments.docs.map(
        (document) =>
          ({
            id: document.id,
            ...document.data(),
          } as User)
      );
      setAllStudents(users);
    };

    getStudents();
  }, []);

  function validateDates(startDate: string, endDate: string): boolean {
    const startMoment = moment(startDate, DATE_FORMAT);
    const endMoment = moment(endDate, DATE_FORMAT);

    return startMoment.isSameOrBefore(endMoment);
  }

  function validateDaysOfTheWeek(): boolean {
    var valid = true;
    const daysOfTheWeek = getValues().daysOfTheWeek;
    for (var dayOfTheWeek of Object.values(DAYS_OF_THE_WEEK)) {
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
    console.log(errors);

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

    try {
      const id = await createCourseDocument({
        ...formData,
        students: multiSelections.map(
          (selection: any) =>
            ({
              id: selection.id,
              displayName: selection.displayName,
              email: selection.email,
            } as Student)
        ),
      });
      toast.success(`Course Created`);
      router.push(id);
    } catch (error) {
      toast.error(`Unable to create course`);
    }
  }

  async function createCourseDocument(course: Course): Promise<string> {
    const response = await addDoc(collection(database, "courses"), {
      ...course,
    });

    return response.id;
  }

  return (
    <AuthGuard userTypes={[UserType.Admin, UserType.Teacher]}>
      <h1>Create Course Page</h1>
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
          <span style={{ color: "red" }}>
            Course name is missing or invalid.
          </span>
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
        <label>Class Times</label>
        <div className="d-flex flex-column align-items-left">
          {watchAllFields &&
            Object.values(DAYS_OF_THE_WEEK).map((dayOfWeek) => (
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
          multiple
          onChange={setMultiSelections}
          options={allStudents}
          placeholder="Choose several states..."
          selected={multiSelections}
        />
        <br />
        {multiSelections.map((s: User) => (
          <p key={s.id}>{s.id}</p>
        ))}
        <br />
        <input className="btn btn-dark" type="submit" value="Submit" />
      </form>

      <input
        className="btn btn-dark"
        onClick={() => console.log(errors)}
        type="button"
        value="Log"
      />
    </AuthGuard>
  );
}
