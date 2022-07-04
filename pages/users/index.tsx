import { collection, getDocs, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthGuard from "../../components/auth-guard";
import { database } from "../../lib/firebase";
import { UserType } from "../../lib/models/user-type.enum";
import { User } from "../../lib/models/user.model";

export default function CreateUser() {
  const [usersState, setUsersState] = useState<User[]>();

  useEffect(() => {
    const getUsers = async () => {
      const userDocuments = await getDocs(query(collection(database, "users")));
      const users = userDocuments.docs.map(
        (document) =>
          ({
            id: document.id,
            ...document.data(),
          } as User)
      );
      setUsersState(users);
    };

    getUsers();
  }, []);

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
