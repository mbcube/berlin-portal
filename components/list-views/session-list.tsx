import { useGetCollectionDocuments } from "../../lib/hooks";
import { Session } from "../../lib/models/session.model";
import { SessionsView } from "../views/session.view";

export default function SessionListView() {
  const sessionCollection = useGetCollectionDocuments<Session>("sessions");

  return <SessionsView sessions={sessionCollection} />;
}
