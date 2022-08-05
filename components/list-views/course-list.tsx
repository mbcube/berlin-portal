import { useGetCollectionDocuments } from "../../lib/hooks";
import { Course } from "../../lib/models/course.model";
import { CoursesView } from "../views/course.view";

export default function CourseListView({ isShort }: any) {
  const coursesCollection = useGetCollectionDocuments<Course>("courses");

  return <CoursesView courses={coursesCollection} isShort={isShort} />;
}
