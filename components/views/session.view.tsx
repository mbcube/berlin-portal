import moment from 'moment'
import { Session } from '../../lib/models/session.model'
import { DATE_KEY_FORMAT } from '../../lib/utils'

export const SessionsView = ({ sessions }: any) => {
  return (
    <>
      {sessions?.map((session: Session) => (
        <p key={session.id}>
          {session.courseName} :
          <br />
          {Object.keys(session.sessions).map((sessionKey) => (
            <SessionView
              key={sessionKey}
              session={session}
              dayKey={sessionKey}
            />
          ))}
        </p>
      ))}
    </>
  )
}

export const SessionView = ({ session, dayKey }: any) => {
  return (
    <a
      key={session.id}
      href={`/session?id=${session.sessions[dayKey]}`}
      target="_blank"
      rel="noreferrer"
      className="btn btn-link"
    >
      {dayKey}
    </a>
  )
}

export const TodaysSessionsView = ({ todaysSessions, todayKey }: any) => {
  return (
    todaysSessions && (
      <>
        <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4 p-3">
          <div className="container-xl px-4">
            <div className="page-header-content">
              <h4 className="m-2">
                Today {moment.utc().format(DATE_KEY_FORMAT)}
              </h4>
            </div>
          </div>
        </header>
        <div className="container-fluid px-4">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col">
        {todaysSessions?.map((session: Session) => (
          <SessionView key={session.id} session={session} dayKey={todayKey} />
        ))}
        {todaysSessions?.length === 0 && <p>You have no sessions today!</p>}
        </div>
            </div>
          </div>
        </div>
      </div>
      </>

    )
  )
}
