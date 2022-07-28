import CourseListView from "../components/list-views/course-list";
import SessionListView from "../components/list-views/session-list";
import UserListView from "../components/list-views/user-list";
import UserTypeView from "../components/user-type";
import { CoursesView } from "../components/views/course.view";
import { TodaysSessionsView } from "../components/views/session.view";
import { useHomeData } from "../lib/hooks";

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
      <div className="row">
        <div className="col">
          <SessionListView></SessionListView>
        </div>
        <div className="col">
          <CourseListView></CourseListView>
        </div>
        <div className="col">
          <UserListView></UserListView>
        </div>
      </div>
    </>
  );
}

function TeacherHome() {
  const homeData = useHomeData();

  return (
    <>
      <TodaysSessionsView
        todaysSessions={homeData?.todaysSessions}
        todayKey={homeData?.todayKey}
      />
      <CoursesView courses={homeData?.myCourses} />
    </>
  );
}

function StudentHome() {
  const homeData = useHomeData();

  return (
    <>
      <TodaysSessionsView
        todaysSessions={homeData?.todaysSessions}
        todayKey={homeData?.todayKey}
      />
      <CoursesView courses={homeData?.myCourses} />
    </>
  );
}
