import { useGetCollectionDocuments } from "../../lib/hooks";
import { Session } from "../../lib/models/session.model";
import Spinner from "../spinner";
import { SessionsView } from "../views/session.view";

export default function SessionListView() {
  const sessionCollection = useGetCollectionDocuments<Session>("sessions", {
    limit: 3,
  });

  return (
    <>
      {!sessionCollection && <Spinner />}
      {sessionCollection && <SessionsView sessions={sessionCollection} />}
    </>
  );
}
