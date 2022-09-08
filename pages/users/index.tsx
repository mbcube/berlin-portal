import Link from "next/link";
import AuthGuard from "../../components/auth-guard";
import Spinner from "../../components/spinner";
import { UserTypeAvatar } from "../../components/user-type-avatar";
import { useGetCollectionDocuments } from "../../lib/hooks";
import { UserType } from "../../lib/models/user-type.enum";
import { User } from "../../lib/models/user.model";

export default function UserList() {
  const usersState = useGetCollectionDocuments<User>("users");
  return (
    <AuthGuard userTypes={[UserType.Admin, UserType.Teacher]}>
      <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div className="container-xl px-4">
          <div className="page-header-content">
            <div className="row align-items-center justify-content-between pt-3">
              <div className="col-auto mb-3">
                <h1 className="page-header-title">Liste d&apos;utilisateurs</h1>
              </div>
              <div className="col-auto col-xl-auto mb-3">
                <Link href="/users/new">
                  <span className="btn btn-sm btn-light text-primary">
                    <i className="bi bi-person-plus me-1"></i>
                    Ajouter
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container-xl px-4">
        {!usersState && <Spinner />}
        {usersState && (
          <div className="row">
            {[UserType.Admin, UserType.Teacher, UserType.Student].map(
              (userType) => (
                <div className="col" key={userType}>
                  <div className="card mb-4">
                    <div className="card-header">{userType}s</div>

                    <div className="card-body">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Utilisateur</th>
                            <th>E-mail</th>
                            {UserType.Student &&
                              userType == UserType.Student && <th>Paiement</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {usersState
                            ?.filter((user) => user.userType === userType)
                            .map((user) => {
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
                                          <UserTypeAvatar
                                            userType={user.userType}
                                          />
                                        </div>

                                        {user.displayName}
                                      </div>
                                    </td>
                                    <td>{user.email}</td>
                                    {UserType.Student &&
                                      userType == UserType.Student && (
                                        <td>{user.payment}</td>
                                      )}
                                  </tr>
                                </Link>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
