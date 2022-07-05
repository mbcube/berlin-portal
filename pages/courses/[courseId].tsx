import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CourseForm from "../../components/forms/course-form";
import { UserContext } from "../../lib/context";
import { database } from "../../lib/firebase";
import { Course, Student } from "../../lib/models/course.model";
import { UserType } from "../../lib/models/user-type.enum";

export default function ViewEditCourse() {
  const router = useRouter();
  const user = useContext(UserContext);
  const [courseState, setCourseState] = useState<Course>();
  const [studentSelectionState, setStudentSelectionState] = useState<Student[]>(
    []
  );

  useEffect(() => {
    getCourse();
  }, [router.query.courseId]);

  async function getCourse() {
    if (!router.query.courseId) return;
    const coursedocument = await getDoc(
      doc(database, "courses", `${router.query.courseId}`)
    );
    const course = {
      id: router.query.userId,
      ...coursedocument.data(),
    } as Course;

    setCourseState(course);
    setStudentSelectionState(course.students);
  }

  async function courseEdited() {
    await getCourse();
  }

  if (user?.userType === UserType.Student) {
    return <ViewCourse />;
  }

  return (
    <EditCourse
      router={router}
      course={courseState}
      students={studentSelectionState}
      onCourseEdited={courseEdited}
    />
  );
}

function EditCourse({ router, course, students, onCourseEdited }: any) {
  const [showEditMode, setShowEditMode] = useState(false);
  const [initialFormData, setInitialFormData] = useState<any>();
  const [studentSelectionState, setStudentSelectionState] =
    useState<Student[]>();

  useEffect(() => {
    setInitialFormData({
      courseName: course?.courseName || "",
      startDate: course?.startDate || 0,
      endDate: course?.endDate || 0,
      daysOfTheWeek: course?.daysOfTheWeek || [],
    });
  }, [course]);

  useEffect(() => {
    setStudentSelectionState(students);
  }, [students]);

  async function onEditCourse(formData: any, students: Student[]) {
    try {
      await editCourseDocument({
        ...formData,
        students,
      });
      toast.success(`Course Edited`);
      setShowEditMode(false);
      onCourseEdited();
    } catch (error) {
      toast.error(`Unable to modify course`);
    }
  }

  async function editCourseDocument(course: Course): Promise<void> {
    await setDoc(doc(database, "courses", router.query.courseId), course);
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <p> Course Id : {router.query.courseId} </p>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => setShowEditMode(!showEditMode)}
        >
          {showEditMode ? "Cancel" : "Edit"}
        </button>
      </div>
      {showEditMode ? (
        <>
          <p>{router.query.courseId.id}</p>
          <h1>Edit Course </h1>
          <CourseForm
            onCourseFormSubmitted={onEditCourse}
            initialFormData={initialFormData}
            initialStudentSelection={studentSelectionState}
          ></CourseForm>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

function ViewCourse({ showEditMode, setShowEditMode, router }: any) {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <p> Hello Student your Course Id is : {router.query.courseId} </p>
    </div>
  );
}
