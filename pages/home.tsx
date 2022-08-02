import Image from 'next/image'
import CourseListView from '../components/list-views/course-list'
import SessionListView from '../components/list-views/session-list'
import UserListView from '../components/list-views/user-list'
import UserTypeView from '../components/user-type'
import { CoursesView } from '../components/views/course.view'
import { TodaysSessionsView } from '../components/views/session.view'
import { useHomeData } from '../lib/hooks'
import { Course, Teacher } from '../lib/models/course.model'
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
      <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div className="container-xl px-4">
          <div className="page-header-content">
            <div className="row align-items-center justify-content-between pt-3">
              <div className="col-auto mb-3">
                <h1 className="page-header-title">
                  <div className="page-header-icon">
                    <i data-feather="user"></i>
                  </div>
                  Home
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container-fluid px-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-3">German </h5>
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <p>
                  <i className="bi bi-calendar4-range me-2"></i>
                  2022-07-15 <i className="bi bi-dash "></i>
                  2022-08-14
                </p>
                <div className="medium text-muted mb-2">Teachers:</div>
                <div className="row mb-3">
                  {homeData?.myCourses?.map((course: Course) => {
                    return course.teachers?.map((teacher: Teacher) => (
                      <div key={teacher.id} className="col col-md-6">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-lg">
                            <Image
                              layout="fill"
                              className="avatar-img img-fluid"
                              src={`/img/illustrations/profiles/profile-${
                                [1, 2, 3, 4, 5, 6][
                                  Math.floor(Math.random() * 6)
                                ]
                              }.png`}
                              alt=""
                            />
                          </div>
                          <div className="ms-3">
                            <div className="fs-5 text-dark fw-500">
                              {teacher.displayName}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  })}
                </div>
                <div className="row mb-3">
                  <div className="col col-md-6">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-lg"></div>
                      <div className="ms-3"></div>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col col-md-6">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-lg"></div>
                    </div>
                  </div>
                  <div className="col col-md-6">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="medium text-muted mb-2">Sessions:</div>
                <p>
                  <i className="bi bi-calendar-event me-2"></i>Monday: 20:28
                  <i className="bi bi-dash "></i>23:28
                </p>
                <p>
                  <i className="bi bi-calendar-event me-2"></i>Thursday: 20:28
                  <i className="bi bi-dash "></i>23:28
                </p>
                <p>
                  <i className="bi bi-calendar-event me-2"></i>Sunday: 18:00
                  <i className="bi bi-dash "></i>21:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
