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
            <SessionView
              key={sessionKey}
              session={session}
              dayKey={sessionKey}
            />
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
      href={`/session?id=${session.sessions[dayKey]}`}
      target="_blank"
      rel="noreferrer"
      className="btn btn-link"
    >
      {dayKey}
    </a>
  );
};

export const TodaysSessionsView = ({ todaysSessions, todayKey }: any) => {
  return (
    todaysSessions && (
      <>
        <h4>Aujourd'hui {moment.utc().format(DATE_KEY_FORMAT)}</h4>
        {todaysSessions?.map((session: Session) => (
          <SessionView key={session.id} session={session} dayKey={todayKey} />
        ))}
        {todaysSessions?.length === 0 && <p>Vous n'avez aucune session aujourd'hui !</p>}
      </>
    )
  );
};
