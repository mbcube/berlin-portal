import { useGetCollectionDocuments } from "../../lib/hooks";
import { User } from "../../lib/models/user.model";

export default function GenerateSessionView(props: { classId: string }) {
  const userCollection = useGetCollectionDocuments<User>("users");

  return (
    <>
      {userCollection?.map((user) => (
        <p key={user.id}>
          {user.displayName}, {user.id}, {user.email}, {user.userType}
        </p>
      ))}
    </>
  );
}
