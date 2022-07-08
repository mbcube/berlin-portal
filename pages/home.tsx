import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import UserTypeView from "../components/user-type";
import { UserContext } from "../lib/context";
import { database } from "../lib/firebase";
import { Course } from "../lib/models/course.model";
import { DAYS_OF_THE_WEEK } from "../lib/utils";

export default function Home() {
  return (
    <UserTypeView
      Admin={<AdminHome />}
      Teacher={<TeacherHome />}
      Student={<StudentHome />}
    />
  );
}

function AdminHome() {
  return <p> this is the landing page for an admin</p>;
}

function TeacherHome() {
  return <p> this is the landing page for a teacher</p>;
}

function StudentHome() {
  const user = useContext(UserContext);
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  useEffect(() => {
    const getMyCourses = async () => {
      const coursesQuery = await getDocs(
        query(
          collection(database, "courses"),
          where("enrollments", "array-contains", user?.id)
        )
      );

      const courses = coursesQuery.docs.map(
        (document) =>
          ({
            id: document.id,
            courseName: document.data().courseName,
            startDate: document.data().startDate,
            endDate: document.data().endDate,
            daysOfTheWeek: document.data().daysOfTheWeek,
          } as Course)
      );
      setMyCourses(courses);
    };

    getMyCourses();
  }, [user]);

  return (
    <>
      this is the landing page for a student {user?.id} {myCourses.length}
      {myCourses.map((course) => (
        <div key={course.id}>
          <p>Name: {course?.courseName}</p>
          <p>Start Date: {course?.startDate}</p>
          <p>End Date: {course?.endDate}</p>
          <h3> Sessions : </h3>
          {Object.values(DAYS_OF_THE_WEEK).map(
            (dayOfTheWeek: DAYS_OF_THE_WEEK) =>
              course?.daysOfTheWeek[dayOfTheWeek].isActive && (
                <p key={dayOfTheWeek}>
                  {`- ${dayOfTheWeek}: ${course.daysOfTheWeek[dayOfTheWeek].startTime} - ${course.daysOfTheWeek[dayOfTheWeek].endTime}`}
                </p>
              )
          )}
        </div>
      ))}
    </>
  );
}
