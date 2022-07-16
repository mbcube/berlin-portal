import Link from "next/link";
import "react-bootstrap-typeahead/css/Typeahead.css";
import AuthGuard from "../../components/auth-guard";
import { useGetCollectionDocuments } from "../../lib/hooks";
import { Course } from "../../lib/models/course.model";
import { UserType } from "../../lib/models/user-type.enum";

export default function CourseList() {
  const coursesState = useGetCollectionDocuments<Course>("courses");

  return (
    <AuthGuard userTypes={[UserType.Admin, UserType.Teacher]}>
      <h1>Course List</h1>
      {!coursesState && <p> Your data is on the way!</p>}
      {coursesState?.map((course) => {
        return (
          <Link key={course.id} href={"courses/" + course.id}>
            <button className="btn btn-link d-block">
              {course.courseName}
            </button>
          </Link>
        );
      })}
    </AuthGuard>
  );
}
