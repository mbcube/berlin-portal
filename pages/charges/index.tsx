import Link from "next/link";
import AuthGuard from "../../components/auth-guard";
import UserTypeView from "../../components/user-type";
import { UserType } from "../../lib/models/user-type.enum";
export default function Home() {
  return (
    <UserTypeView
      Admin={<AdminHome />}
      Teacher={undefined}
      Student={undefined}
    />
  );
}

function AdminHome() {
  return (
    <>
      <AuthGuard userTypes={[UserType.Admin]}>
        <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
          <div className="container-xl px-4">
            <div className="page-header-content">
              <div className="row align-items-center justify-content-between pt-3">
                <div className="col-auto mb-3">
                  <h1 className="page-header-title">
                    <div className="page-header-icon">
                      <i data-feather="user"></i>
                    </div>
                    Charge
                  </h1>
                </div>
                <div className="col-auto col-xl-auto mb-3">
                  <Link href="/charges/charge">
                    <span className="btn btn-sm btn-light text-primary">
                      <i className="bi bi-file-earmark-plus me-2"></i>
                      Ajouter
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Date </th>
                        <th>Type</th>
                        <th>Prix </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td> </td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthGuard>
    </>
  );
}
