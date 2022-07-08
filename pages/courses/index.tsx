import { collection, getDocs, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import AuthGuard from "../../components/auth-guard";
import { database } from "../../lib/firebase";
import { Course } from "../../lib/models/course.model";
import { UserType } from "../../lib/models/user-type.enum";

export default function CourseList() {
  const [coursesState, setCoursesState] = useState<Course[]>();

  useEffect(() => {
    const getUsers = async () => {
      const courseDocuments = await getDocs(
        query(collection(database, "courses"))
      );
      const courses = courseDocuments.docs.map(
        (document) =>
          ({
            id: document.id,
            ...document.data(),
          } as Course)
      );
      setCoursesState(courses);
    };

    getUsers();
  }, []);

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
