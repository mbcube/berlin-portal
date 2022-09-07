import { addDoc, collection } from "firebase/firestore";
import moment from "moment";
import router from "next/router";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthGuard from "../../components/auth-guard";
import { database } from "../../lib/firebase";
import { Expense, ExpenseType } from "../../lib/models/expense.model";
import { UserType } from "../../lib/models/user-type.enum";
import { DATE_FORMAT, DATE_REGEX } from "../../lib/utils";

export default function Editer() {
  const today = moment().format(DATE_FORMAT);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onCreateExpense(formData: any) {
    try {
      await createExpenseDocument({
        ...formData,
        currency: "DH",
        timestamp: moment().unix(),
      });
      toast.success(`Votre charge a été ajouté avec succès`);
      router.push("/expenses");
    } catch (error) {
      toast.error(`Une Erreur S'est Produite, Veuillez Réessayer Plus Tard`);
    }
  }

  async function createExpenseDocument(expense: Expense): Promise<string> {
    const response = await addDoc(collection(database, "expenses"), {
      ...expense,
    });

    return response.id;
  }

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
            <form
              className="form-group"
              onSubmit={handleSubmit(onCreateExpense)}
            >
              <div className="row gx-3 mb-3">
                <div className="col col-lg-6">
                  <section className="mb-3">
                    <label className="small mb-1">Description </label>
                    <input
                      className="form-control mb-2"
                      type="text"
                      placeholder="Description de la charge"
                      {...register("description", {
                        required: true,
                        minLength: 5,
                      })}
                    />
                    {errors.description && (
                      <span style={{ color: "red" }}>Description invalid.</span>
                    )}
                  </section>
                  <section className="mb-3">
                    <label className="small mb-1">Date</label>
                    <div className="d-flex align-items-center justify-content-between">
                      <i className="bi bi-calendar-event me-2"></i>
                      <input
                        className="form-control mb-2"
                        type="date"
                        {...register("date", {
                          value: today,
                          required: true,
                          pattern: DATE_REGEX,
                        })}
                      />
                    </div>
                    {errors.date && (
                      <span style={{ color: "red" }}>Date invalid.</span>
                    )}
                  </section>
                  <section className="mb-3">
                    <label className="small mb-1">Type</label>

                    <select
                      className="form-select mb-2"
                      {...register("type", {
                        required: true,
                      })}
                    >
                      <option disabled>Select:</option>
                      <option value={ExpenseType.material}>materiel</option>
                      <option value={ExpenseType.immaterial}>immateriel</option>
                    </select>
                    {errors.userType && (
                      <span style={{ color: "red" }}>Type invalid.</span>
                    )}
                  </section>

                  <section className="mb-3">
                    <label className="small mb-1">Prix (DH)</label>
                    <input
                      className="form-control mb-2"
                      type="number"
                      placeholder="Prix de la charge "
                      {...register("price", {
                        required: true,
                        pattern: /\d+/,
                      })}
                    />
                    {errors.price && (
                      <span style={{ color: "red" }}>Prix invalid.</span>
                    )}
                  </section>
                </div>
              </div>
              <input className="btn btn-primary" type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
