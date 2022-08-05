import Link from "next/link";
import AuthGuard from "../../components/auth-guard";
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
                <h1 className="page-header-title">
                  <div className="page-header-icon">
                    <i data-feather="user"></i>
                  </div>
                  Users List
                </h1>
              </div>
              <div className="col-auto col-xl-auto mb-3">
                <Link href="/users/new">
                  <span className="btn btn-sm btn-light text-primary">
                    <i className="bi bi-person-plus me-1"></i>
                    Add New User
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container-xl px-4">
        {!usersState && <p> Your data is on the way!</p>}
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
                            <th>User</th>
                            <th>Email</th>
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

// {usersState
//   ?.filter((user) => user.userType === userType)
//   .map((user) => {
//     return (
//       <div
//         key={user.id}
//         className="d-flex align-items-center justify-content-between mb-4"
//       >
//         <div className="d-flex align-items-center flex-shrink-0 me-3">
//           <div className="avatar avatar-xl me-3 bg-gray-200">
//             <Image
//               layout="fill"
//               className="avatar-img img-fluid"
//               src={`/img/illustrations/profiles/profile-${
//                 [1, 2, 3, 4, 5, 6][
//                   Math.floor(Math.random() * 6)
//                 ]
//               }.png`}
//               alt=""
//             />
//           </div>
//           <div className="d-flex flex-column fw-bold">
//             <Link
//               className="text-dark line-height-normal mb-1"
//               href={"users/" + user.id}
//             >
//               {user.displayName}
//             </Link>
//             <div className="small text-muted line-height-normal">
//               {user.userType}
//             </div>
//           </div>
//         </div>
//         <div className="dropdown no-caret">
//           <button
//             className="btn btn-transparent-dark btn-icon dropdown-toggle"
//             id="dropdownPeople1"
//             type="button"
//             data-bs-toggle="dropdown"
//             aria-haspopup="true"
//             aria-expanded="false"
//           >
//             <i className="bi bi-three-dots-vertical"></i>
//           </button>
//           <div
//             className="dropdown-menu dropdown-menu-end animated--fade-in-up"
//             aria-labelledby="dropdownPeople1"
//           >
//             <a className="dropdown-item" href="#!">
//               Action
//             </a>
//             <a className="dropdown-item" href="#!">
//               Another action
//             </a>
//             <a className="dropdown-item" href="#!">
//               Something else here
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   })}
