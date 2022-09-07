import { useGetCollectionDocuments } from "../../lib/hooks";
import { Course } from "../../lib/models/course.model";
import Spinner from "../spinner";
import { CoursesView } from "../views/course.view";

export default function CourseListView({ isShort }: any) {
  const coursesCollection = useGetCollectionDocuments<Course>("courses", {
    limit: 3,
  });

  return (
    <>
      {!coursesCollection && <Spinner />}
      {coursesCollection && (
        <CoursesView courses={coursesCollection} isShort={isShort} />
      )}
    </>
  );
}
