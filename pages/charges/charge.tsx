import moment from 'moment'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import AuthGuard from '../../components/auth-guard'
import { DaysOfTheWeek } from '../../lib/models/course.model'
import { UserType } from '../../lib/models/user-type.enum'
import { DATE_FORMAT, DAYS_OF_THE_WEEK } from '../../lib/utils'

export default function Éditer() {
  const today = moment().format(DATE_FORMAT)
  const nextMonth = moment().add(30, 'day').format(DATE_FORMAT)
  const initialFormData = {
    startDate: today,
    endDate: nextMonth,
    daysOfTheWeek: Object.values(DAYS_OF_THE_WEEK).reduce(
      (previous: any, current: any) => ({
        ...previous,
        [current]: { isActive: false, startTime: null, endTime: null },
      }),
      {}
    ) as DaysOfTheWeek,
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
            <div className="row">
              <div className="col">
                <form className="form-group">
                  <div className="row gx-3 mb-3">
                    <div className="col col-lg-6">
                      <section className="mb-3">
                        <label className="small mb-1">Nom de la charge </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Entrer nom de la charge "
                        />
                      </section>

                      <section className="mb-3">
                        <label className="small mb-1">Date d'entrer</label>
                        <div className="d-flex align-items-center justify-content-between">
                          <i className="bi bi-calendar4-range me-2"></i>
                          <input className="form-control" type="date" />
                        </div>

                        <span style={{ color: 'red' }}></span>
                      </section>
                      <div className="col-md-6 mb-3">
                        <label className="small mb-1">Type</label>

                        <select className="form-select">
                          <option disabled>Select a Type:</option>
                          <option value="materiel">materiel</option>
                          <option value="immateriel">immateriel</option>
                        </select>
                        <section className="mb-3">
                          <label className="small mb-1">
                            Prix de la charge{' '}
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Entrer prix de la charge "
                          />
                        </section>
                        <input
                          className="btn btn-primary"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
