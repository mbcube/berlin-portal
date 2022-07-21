import moment from "moment";
import { Session } from "../../lib/models/session.model";
import { DATE_KEY_FORMAT } from "../../lib/utils";

export const SessionsView = ({ sessions }: any) => {
  return (
    <>
      {sessions?.map((session: Session) => (
        <p key={session.id}>
          {session.courseName} :
          <br />
          {Object.keys(session.sessions).map((sessionKey) => (
            <a
              key={sessionKey}
              href={session.sessions[sessionKey]}
              target="_blank"
              rel="noreferrer"
              className="btn btn-link"
            >
              {sessionKey}
            </a>
          ))}
        </p>
      ))}
    </>
  );
};

export const SessionView = ({ session, dayKey }: any) => {
  return (
    <a
      key={session.id}
      href={session.sessions[dayKey]}
      target="_blank"
      rel="noreferrer"
      className="btn btn-link"
    >
      Go to session
    </a>
  );
};

export const TodaysSessionsView = ({ todaysSessions, todayKey }: any) => {
  return (
    todaysSessions && (
      <>
        <h4>Today {moment.utc().format(DATE_KEY_FORMAT)}</h4>
        {todaysSessions?.map((session: Session) => (
          <SessionView key={session.id} session={session} dayKey={todayKey} />
        ))}
        {todaysSessions?.length === 0 && <p>You have no sessions today!</p>}
      </>
    )
  );
};
