import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import SessionListView from "../components/session/session-list";
import UserTypeView from "../components/user-type";
import { UserContext } from "../lib/context";
import { database } from "../lib/firebase";
import { Course } from "../lib/models/course.model";
import { Session } from "../lib/models/session.model";
import { DATE_KEY_FORMAT, DAYS_OF_THE_WEEK } from "../lib/utils";

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
  return (
    <>
      <p> this is the landing page for an admin</p>
      <SessionListView classId="12345"></SessionListView>
    </>
  );
}

function TeacherHome() {
  return <p> this is the landing page for a teacher</p>;
}

function StudentHome() {
  const user = useContext(UserContext);
  const todayKey = moment.utc().format(DATE_KEY_FORMAT);

  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [mySessions, setMySessions] = useState<Session[]>([]);
  const [todaysSessions, setTodaysSessions] = useState<Session[]>([]);

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

  useEffect(() => {
    if (myCourses.length == 0) return;

    const getSession = async () => {
      const sessionDocuments = await Promise.all(
        myCourses.map(
          async (course) => await getDoc(doc(database, "sessions", course.id))
        )
      );
      const sessions = sessionDocuments
        .filter((sessionDocument) => sessionDocument.exists())
        .map((sessionDocument) => sessionDocument.data() as Session);

      setMySessions(sessions);
      setTodaysSessions(
        mySessions.filter(
          (mySession) =>
            mySession &&
            mySession.sessions &&
            Object.keys(mySession.sessions).includes(todayKey)
        )
      );
    };

    getSession();
  }, [myCourses]);

  return (
    <>
      this is the landing page for a student. Course Count :{myCourses.length},
      Session Count: {mySessions.length}
      <h1>Today {moment.utc().format(DATE_KEY_FORMAT)}</h1>
      {todaysSessions.map((session: Session) => (
        <p key={session.id}> {session.sessions[todayKey]}</p>
      ))}
      {todaysSessions.length === 0 && <p>You have no sessions today!</p>}
      <h1> Course Information</h1>
      {myCourses.map((course) => (
        <div key={course.id}>
          <p>Name: {course?.id}</p>
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
