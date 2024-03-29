import Link from "next/link";
import { useGetCollectionDocuments } from "../../lib/hooks";
import { User } from "../../lib/models/user.model";
import Spinner from "../spinner";
import { UserTypeAvatar } from "../user-type-avatar";

export default function UserListView() {
  const userCollection = useGetCollectionDocuments<User>("users", {
    limit: 0,
  });

  return (
    <>
      <h2> Liste d&apos;utilisateurs</h2>
      {!userCollection && <Spinner />}
      {userCollection && userCollection.length !== 0 && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {userCollection?.map((user) => {
              return (
                <Link
                  key={user.id}
                  className="text-dark line-height-normal mb-1"
                  href={"users/" + user.id}
                >
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar me-2">
                          <UserTypeAvatar userType={user.userType} />
                        </div>

                        {user.displayName}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.userType}</td>
                  </tr>
                </Link>
              );
            })}
          </tbody>
        </table>
      )}
      {userCollection?.length === 0 && <p>Aucun utilisateur disponible!</p>}
    </>
  );
}
