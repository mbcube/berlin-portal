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
      <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div className="container-xl px-4">
          <div className="page-header-content">
            <div className="row align-items-center justify-content-between pt-3">
              <div className="col-auto mb-3">
                <h1 className="page-header-title py-2">Accueil</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container-fluid px-4">
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="card mb-3">
              <div className="card-body">
                <CourseListView isShort={true}></CourseListView>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="card mb-3">
              <div className="card-body">
                <SessionListView></SessionListView>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <UserListView></UserListView>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TeacherHome() {
  const homeData = useHomeData();

  return (
    <>
      <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4 p-3">
        <div className="container-xl px-4">
          <div className="page-header-content">
            <div className="row align-items-center justify-content-between pt-3">
              <div className="col-auto mb-3">
                <h1 className="page-header-title">Accueil</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container-fluid px-4">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <TodaysSessionsView
                  todaysSessions={homeData?.todaysSessions}
                  todayKey={homeData?.todayKey}
                />
                <CoursesView courses={homeData?.myCourses} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StudentHome() {
  const homeData = useHomeData();

  return (
    <>
      <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4 ">
        <div className="container-xl px-4">
          <div className="page-header-content">
            <div className="row align-items-center justify-content-between pt-3">
              <div className="col-auto mb-3">
                <h1 className="page-header-title">Accueil</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container-fluid px-4">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <TodaysSessionsView
                  todaysSessions={homeData?.todaysSessions}
                  todayKey={homeData?.todayKey}
                />
                <CoursesView courses={homeData?.myCourses} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
