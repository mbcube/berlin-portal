import ErrorPage from "next/error";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { UserType } from "../lib/models/user-type.enum";

export default function AuthGuard(props: {
  userTypes: UserType[];
  children: any;
}) {
  const user = useContext(UserContext);

  return user && props.userTypes.includes(user.userType) ? (
    props.children
  ) : (
    <ErrorPage statusCode={401} title="Non autorisé" />
  );
}
