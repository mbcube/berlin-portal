import CourseListView from '../components/list-views/course-list'
import SessionListView from '../components/list-views/session-list'
import UserListView from '../components/list-views/user-list'
import UserTypeView from '../components/user-type'
import { CoursesView } from '../components/views/course.view'
import { TodaysSessionsView } from '../components/views/session.view'
import { useHomeData } from '../lib/hooks'

export default function Home() {
  return (
    <UserTypeView
      Admin={<AdminHome />}
      Teacher={<TeacherHome />}
      Student={<StudentHome />}
    />
  )
}

function AdminHome() {
  return (
    <>
      <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4 p-3">
        <div className="container-xl px-4">
          <div className="page-header-content">
            <h4 className="m-2">This is the landing page for an Admin</h4>
          </div>
        </div>
      </header>
      <div className="container-fluid px-4">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col">
                    <SessionListView></SessionListView>
                    <table>
                      <tr></tr>
                    </table>
                  </div>
                  <div className="col">
                    <CourseListView></CourseListView>
                  </div>
                  <div className="col">
                    <UserListView></UserListView>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function TeacherHome() {
  const homeData = useHomeData()

  return (
    <>

      <TodaysSessionsView
        todaysSessions={homeData?.todaysSessions}
        todayKey={homeData?.todayKey}
      />
      <CoursesView courses={homeData?.myCourses} />
    </>
  )
}

function StudentHome() {
  const homeData = useHomeData()

  return (
    <>
      <TodaysSessionsView
        todaysSessions={homeData?.todaysSessions}
        todayKey={homeData?.todayKey}
      />
      <CoursesView courses={homeData?.myCourses} />
    </>
  )
}
