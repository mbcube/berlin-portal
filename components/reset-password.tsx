import { confirmPasswordReset } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { auth } from "../lib/firebase";

export default function ResetPassword() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  async function onReset(formData: any) {
    if (!router.query.email || !router.query.oobCode) {
      toast.error(
        `Something went wrong, please generate a new reset-password link and try again.`
      );
      return;
    }

    if (formData["password"] !== formData["verifyPassword"]) {
      setError("verifyPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      await confirmPasswordReset(
        auth,
        router.query.oobCode as string,
        formData.password
      );
      toast.success(
        `Your password has ben reset, login with your new password.`
      );
      router.push("/login");
    } catch (error) {
      toast.error(
        `Something went wrong, please generate a new reset-password link and try again.`
      );
    }
  }

  return (
    <main className="form-signin w-100 m-auto">
      <form
        id="sign-in-form"
        onSubmit={handleSubmit(onReset)}
        className="text-center w-100"
      >
        <Image
          className="logo"
          src="/berlin-logo.png"
          width={120}
          height={120}
          layout="fixed"
          alt="logo"
        />
        <h4 className="h4 mb-2 fw-normal">Reset your password</h4>
        <h6 className="h6 mb-4 fw-normal">{router.query.email}</h6>
        <div className="form-floating">
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {errors.password && (
          <label className="mb-2 text-danger">Password is missing.</label>
        )}

        <div className="form-floating">
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Re-enter Password"
            {...register("verifyPassword", { required: true })}
          />
          <label htmlFor="floatingPassword">Re-enter Password</label>
        </div>
        {errors.verifyPassword && (
          <label className="mb-2 text-danger">
            {errors.verifyPassword.message || "Password is missing."}
          </label>
        )}

        <input
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          value="Reset Password"
        />
        <p className="mt-5 mb-3 text-muted">&copy; 2022-2023</p>
      </form>
    </main>
  );
}
