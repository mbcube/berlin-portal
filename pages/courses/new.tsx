import { addDoc, collection } from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-bootstrap-typeahead/css/Typeahead.css";
import toast from "react-hot-toast";
import AuthGuard from "../../components/auth-guard";
import CourseForm from "../../components/forms/course-form";
import { database } from "../../lib/firebase";
import {
  Course,
  DaysOfTheWeek,
  Student,
  Teacher,
} from "../../lib/models/course.model";
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

  async function onCreateCourse(
    formData: any,
    students: Student[],
    teachers: Teacher[]
  ) {
    try {
      const id = await createCourseDocument({
        ...formData,
        students,
        teachers,
        enrollments: [
          ...students.map((student) => student.id),
          ...teachers.map((teacher) => teacher.id),
        ],
      });
      toast.success(`Cours créé`);
      router.push(`/courses/${id}`);
    } catch (error) {
      toast.error(`Impossible de créer un cours`);
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
      <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div className="container-xl px-4">
          <div className="page-header-content">
            <div className="row align-items-center justify-content-between pt-3">
              <div className="col-auto mb-3">
                <h1 className="page-header-title">Créer un cours</h1>
              </div>
              <div className="col-auto col-xl-auto mb-3">
                <Link href="/courses">
                  <span className="btn btn-sm btn-light text-primary me-3">
                    <i className="bi bi-arrow-left-short"></i>
                    Retour
                  </span>
                </Link>
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
                <CourseForm
                  onCourseFormSubmitted={onCreateCourse}
                  initialFormData={initialFormData}
                ></CourseForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
