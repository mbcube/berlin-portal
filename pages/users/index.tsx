import Link from "next/link";
import AuthGuard from "../../components/auth-guard";
import { useGetCollectionDocuments } from "../../lib/hooks";
import { UserType } from "../../lib/models/user-type.enum";
import { User } from "../../lib/models/user.model";

export default function UserList() {
  const usersState = useGetCollectionDocuments<User>("users");

  return (
    <AuthGuard userTypes={[UserType.Admin, UserType.Teacher]}>
      <h1>User List</h1>
      {!usersState && <p> Your data is on the way!</p>}
      {usersState?.map((user) => {
        return (
          <Link key={user.id} href={"users/" + user.id}>
            <button className="btn btn-link d-block">
              {user.displayName} | {user.userType}
            </button>
          </Link>
        );
      })}
    </AuthGuard>
  );
}
