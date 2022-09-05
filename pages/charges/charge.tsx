import moment from "moment";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useForm } from "react-hook-form";
import AuthGuard from "../../components/auth-guard";
import { ExpenseType } from "../../lib/models/expense.model";
import { UserType } from "../../lib/models/user-type.enum";
import { DATE_FORMAT, DATE_REGEX } from "../../lib/utils";

export default function Éditer() {
  const today = moment().format(DATE_FORMAT);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <AuthGuard userTypes={[UserType.Admin]}>
      <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4 p-3">
        <div className="container-xl px-4">
          <div className="page-header-content">
            <h4 className="m-2">Create charges</h4>
          </div>
        </div>
      </header>
      <div className="container-fluid px-4">
        <div className="card">
          <div className="card-body">
            <form className="form-group">
              <div className="row gx-3 mb-3">
                <div className="col col-lg-6">
                  <section className="mb-3">
                    <label className="small mb-1">Description </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter course name"
                      {...register("description", {
                        required: true,
                        minLength: 5,
                      })}
                    />
                    {errors.description && (
                      <span style={{ color: "red" }}>
                        Description is missing or invalid.
                      </span>
                    )}
                  </section>

                  <section className="mb-3">
                    <label className="small mb-1">Date</label>
                    <div className="d-flex align-items-center justify-content-between">
                      <i className="bi bi-calendar-event me-2"></i>
                      <input
                        className="form-control"
                        type="date"
                        {...register("date", {
                          required: true,
                          pattern: DATE_REGEX,
                        })}
                      />
                    </div>
                    {errors.date && (
                      <span style={{ color: "red" }}>
                        Start Date is missing or invalid
                      </span>
                    )}
                  </section>
                  <section className="mb-3">
                    <label className="small mb-1">Type</label>

                    <select className="form-select" {...register("userType")}>
                      <option disabled>Select:</option>
                      <option value={ExpenseType.material}>materiel</option>
                      <option value={ExpenseType.immaterial}>immateriel</option>
                    </select>
                    {errors.userType && <p>Role is required.</p>}
                  </section>

                  <section className="mb-3">
                    <label className="small mb-1">Prix</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Entrer le prix de la charge "
                    />
                  </section>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
