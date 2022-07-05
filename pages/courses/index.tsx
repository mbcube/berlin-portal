import { addDoc, collection } from "firebase/firestore";
import moment from "moment";
import { useRouter } from "next/router";
import "react-bootstrap-typeahead/css/Typeahead.css";
import toast from "react-hot-toast";
import AuthGuard from "../../components/auth-guard";
import CourseForm from "../../components/forms/course-form";
import { database } from "../../lib/firebase";
import { Course, DaysOfTheWeek, Student } from "../../lib/models/course.model";
import { UserType } from "../../lib/models/user-type.enum";
import { DATE_FORMAT, DAYS_OF_THE_WEEK } from "../../lib/utils";

export default function CreateCourse() {
  const router = useRouter();
  const today = moment().format(DATE_FORMAT);
  const nextMonth = moment().add(30, "day").format(DATE_FORMAT);
  const initialFormData = {
    courseName: "",
    startDate: today,
    endDate: nextMonth,
    daysOfTheWeek: Object.values(DAYS_OF_THE_WEEK).reduce(
      (previous: any, current: any) => ({
        ...previous,
        [current]: { isActive: false, startTime: null, endTime: null },
      }),
      {}
    ) as DaysOfTheWeek,
  };

  async function onCreateCourse(formData: any, students: Student[]) {
    try {
      const id = await createCourseDocument({
        ...formData,
        students,
      });
      toast.success(`Course Created`);
      router.push(`/courses/${id}`);
    } catch (error) {
      toast.error(`Unable to create course`);
    }
  }

  async function createCourseDocument(course: Course): Promise<string> {
    const response = await addDoc(collection(database, "courses"), {
      ...course,
    });

    return response.id;
  }

  return (
    <AuthGuard userTypes={[UserType.Admin, UserType.Teacher]}>
      <h1>Create Course Page</h1>
      <CourseForm
        onCourseFormSubmitted={onCreateCourse}
        initialFormData={initialFormData}
      ></CourseForm>
    </AuthGuard>
  );
}
