import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CourseForm from "../../components/forms/course-form";
import { UserTypeAvatar } from "../../components/user-type-avatar";
import { UserContext } from "../../lib/context";
import { database } from "../../lib/firebase";
import { Course, Student, Teacher } from "../../lib/models/course.model";
import { UserType } from "../../lib/models/user-type.enum";
import { DAYS_OF_THE_WEEK } from "../../lib/utils";

export default function ViewEditCourse() {
  const router = useRouter();
  const user = useContext(UserContext);
  const [courseState, setCourseState] = useState<Course>();
  const [studentSelectionState, setStudentSelectionState] = useState<Student[]>(
    []
  );
  const [teacherSelectionState, setTeacherSelectionState] = useState<Teacher[]>(
    []
  );
  useEffect(() => {
    getCourse();
  }, [router.query.courseId]);

  async function getCourse() {
    if (!router.query.courseId) return;
    const courseDocument = await getDoc(
      doc(database, "courses", `${router.query.courseId}`)
    );
    const course = {
      id: router.query.userId,
      ...courseDocument.data(),
    } as Course;

    setCourseState(course);
    setStudentSelectionState(course.students || []);
    setTeacherSelectionState(course.teachers || []);
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
      teachers={teacherSelectionState}
      onCourseEdited={courseEdited}
    />
  );
}

function EditCourse({
  router,
  course,
  students,
  teachers,
  onCourseEdited,
}: any) {
  const [showEditMode, setShowEditMode] = useState(false);
  const [initialFormData, setInitialFormData] = useState<any>();
  const [courseState, setCourseState] = useState<Course>();
  const [studentSelectionState, setStudentSelectionState] =
    useState<Student[]>();
  const [teacherSelectionState, setTeacherSelectionState] =
    useState<Student[]>();

  useEffect(() => {
    setInitialFormData({
      courseName: course?.courseName || "",
      startDate: course?.startDate || 0,
      endDate: course?.endDate || 0,
      daysOfTheWeek: course?.daysOfTheWeek || [],
    });
    setCourseState(course);
  }, [course]);

  useEffect(() => {
    setStudentSelectionState(students);
  }, [students]);

  useEffect(() => {
    setTeacherSelectionState(teachers);
  }, [teachers]);

  async function onEditCourse(
    formData: any,
    students: Student[],
    teachers: Teacher[]
  ) {
    try {
      await editCourseDocument({
        ...formData,
        students,
        teachers,
        enrollments: [
          ...students.map((student) => student.id),
          ...teachers.map((teacher) => teacher.id),
        ],
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
      <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div className="container-xl px-4">
          <div className="page-header-content">
            <div className="row align-items-center justify-content-between pt-3">
              <div className="col-auto mb-3">
                <h1 className="page-header-title">
                  <div className="page-header-icon">
                    <i data-feather="user"></i>
                  </div>
                  Course
                </h1>
              </div>
              <div className="col-auto col-xl-auto mb-3">
                <button
                  className={`btn btn-sm btn-light ${
                    !showEditMode ? "text-primary" : "text-danger"
                  }`}
                  onClick={() => setShowEditMode(!showEditMode)}
                >
                  {!showEditMode ? (
                    <>
                      <i className="bi bi-pencil-square me-2"></i>
                      Edit
                    </>
                  ) : (
                    <>
                      <i className="bi bi-x-lg me-2"></i>
                      Cancel
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {showEditMode ? (
        <>
          <div className="container-fluid px-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">Edit Course</h5>
                <div className="row">
                  <div className="col">
                    <CourseForm
                      onCourseFormSubmitted={onEditCourse}
                      initialFormData={initialFormData}
                      initialStudentSelection={studentSelectionState}
                      initialTeacherSelection={teacherSelectionState}
                    ></CourseForm>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container-fluid px-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">{courseState?.courseName}</h5>
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <p>
                      <i className="bi bi-calendar4-range me-2"></i>
                      {courseState?.startDate} <i className="bi bi-dash "></i>
                      {courseState?.endDate}
                    </p>
                    <div className="medium text-muted mb-2">Teachers:</div>
                    <div className="row mb-3">
                      {courseState?.teachers?.map((teacher: Teacher) => (
                        <div key={teacher.id} className="col col-md-6">
                          <div className="d-flex align-items-center">
                            <div className="avatar avatar-lg">
                              <UserTypeAvatar userType={UserType.Teacher} />
                            </div>
                            <div className="ms-3">
                              <div className="fs-5 text-dark fw-500">
                                {teacher.displayName}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="medium text-muted mb-2">Student:</div>
                    <div className="row mb-3">
                      {courseState?.students?.map((student: Student) => (
                        <div key={student.id} className="col col-md-6">
                          <div className="d-flex align-items-center">
                            <div className="avatar avatar-lg">
                              <UserTypeAvatar userType={UserType.Student} />
                            </div>
                            <div className="ms-3">
                              <div className="fs-5 text-dark fw-500">
                                {student.displayName}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-12  col-lg-6">
                    <div className="medium text-muted mb-2">Sessions:</div>
                    {Object.values(DAYS_OF_THE_WEEK).map(
                      (dayOfTheWeek: DAYS_OF_THE_WEEK) =>
                        courseState?.daysOfTheWeek[dayOfTheWeek].isActive && (
                          <p key={dayOfTheWeek}>
                            <i className="bi bi-calendar-event me-2"></i>
                            {`${dayOfTheWeek}:`}{" "}
                            {course.daysOfTheWeek[dayOfTheWeek].startTime}
                            <i className="bi bi-dash "></i>
                            {course.daysOfTheWeek[dayOfTheWeek].endTime}
                          </p>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function ViewCourse({ router }: any) {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <p> Hello Student your Course Id is : {router.query.courseId} </p>
    </div>
  );
}
