import { useRouter } from "next/router";

export default function CreateCourse() {
  const router = useRouter();

  return (
    <>
      <p> Course Id : {router.query.courseId} </p>
    </>
  );
}
