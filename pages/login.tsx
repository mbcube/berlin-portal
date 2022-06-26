import type { NextPage } from "next";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { UserContext } from "../lib/context";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../lib/utils";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useContext(UserContext);

  async function onLogin(formData: any) {
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success(`Welcome`);
    } catch (error) {
      toast.error(`Invalid Credentials`);
    }
  }

  return (
    <main>
      <p> {user?.displayName}</p>
      <p> {user?.email}</p>
      <p> {user?.userType}</p>

      {!user ? (
        <form onSubmit={handleSubmit(onLogin)}>
          <h1>Login</h1>
          <label>email</label>
          <input
            type="text"
            {...register("email", { required: true, pattern: EMAIL_REGEX })}
          />
          {errors.email && (
            <span style={{ color: "red" }}>Email is missing or invalid.</span>
          )}

          <br />
          <label>password</label>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span style={{ color: "red" }}>Password is missing.</span>
          )}
          <br />
          <input type="submit" value="login" />
        </form>
      ) : (
        <>
          <h1>Logout</h1>
          <input type="button" onClick={() => auth.signOut()} value="logout" />
        </>
      )}
    </main>
  );
}
