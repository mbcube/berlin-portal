import ErrorPage from "next/error";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { UserType } from "../lib/models/user-type.enum";

export default function UserTypeView(props: { [key in UserType]: any }) {
  const user = useContext(UserContext);

  return user && props[user.userType] ? (
    props[user.userType]
  ) : (
    <ErrorPage statusCode={404} title="Not Found" />
  );
}
