import Link from "next/link";
import AuthGuard from "../../components/auth-guard";
import { useGetCollectionDocuments } from "../../lib/hooks";
import { Course } from "../../lib/models/course.model";
import { UserType } from "../../lib/models/user-type.enum";

export default function CourseList() {
  const coursesState = useGetCollectionDocuments<Course>("courses");

  return (
    <AuthGuard userTypes={[UserType.Admin, UserType.Teacher]}>
      <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div className="container-xl px-4">
          <div className="page-header-content">
            <div className="row align-items-center justify-content-between pt-3">
              <div className="col-auto mb-3">
                <h1 className="page-header-title">
                  <div className="page-header-icon">
                    <i data-feather="user"></i>
                  </div>
                  Course List
                </h1>
              </div>
              <div className="col-auto col-xl-auto mb-3">
                <Link href="/courses/new">
                  <span className="btn btn-sm btn-light text-primary">
                    <i className="bi bi-file-earmark-plus me-2"></i>
                    Create Course
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container-xl px-4">
        {!coursesState && <p> Your data is on the way!</p>}
        {coursesState && (
          <div className="row">
            <div className="col">
              <div className="card mb-4">
                {/* <div className="card-header">Course List</div> */}
                <div className="card-body">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Teacher</th>
                        <th>Students</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coursesState?.map((course) => {
                        return (
                          <Link
                            key={course.id}
                            className="text-dark line-height-normal mb-1"
                            href={"courses/" + course.id}
                          >
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  {course.courseName}
                                </div>
                              </td>
                              <td>{course.startDate}</td>
                              <td>{course.endDate}</td>
                              <td>{course.teachers?.at(0)?.displayName}</td>
                              <td>{course.students?.length}</td>
                            </tr>
                          </Link>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}

{
  /* <h1>Course List</h1>
{coursesState?.map((course) => (
  <Link key={course.id} href={"courses/" + course.id}>
    <button className="btn btn-link d-block">{course.courseName}</button>
  </Link>
))} */
}
