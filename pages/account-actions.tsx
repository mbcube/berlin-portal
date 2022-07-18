import ErrorPage from "next/error";
import { useRouter } from "next/router";
import ResetPassword from "../components/reset-password";

export default function AccountActions() {
  const router = useRouter();

  return router.query.mode && router.query.mode === "resetPassword" ? (
    <ResetPassword />
  ) : (
    <ErrorPage statusCode={404} />
  );
}
