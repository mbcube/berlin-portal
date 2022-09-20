import moment from "moment";
import Link from "next/link";
import AuthGuard from "../../components/auth-guard";
import Spinner from "../../components/spinner";
import { useGetCollectionDocuments } from "../../lib/hooks";
import { Expense } from "../../lib/models/expense.model";
import { UserType } from "../../lib/models/user-type.enum";
import { DATE_FORMAT } from "../../lib/utils";
export default function Expenses() {
  const today = moment().format(DATE_FORMAT);
  const lastMonth = moment().subtract(30, "day").format(DATE_FORMAT);

  const expenseCollection = useGetCollectionDocuments<Expense>("expenses", {
    startDate: lastMonth,
  });
  return (
    <>
      <AuthGuard userTypes={[UserType.Admin]}>
        <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
          <div className="container-xl px-4">
            <div className="page-header-content">
              <div className="row align-items-center justify-content-between pt-3">
                <div className="col-auto mb-3">
                  <h1 className="page-header-title">Charges</h1>
                </div>
                <div className="col-auto col-xl-auto mb-3">
                  <Link href="/expenses/new">
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
                  {!expenseCollection && <Spinner />}
                  {expenseCollection && (
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
                        {expenseCollection?.map((expense) => (
                          <tr key={expense.timestamp}>
                            <td>{expense.description}</td>
                            <td>{expense.date}</td>
                            <td>{expense.type} </td>
                            <td>{expense.price} DH</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthGuard>
    </>
  );
}
