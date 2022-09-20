import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";
import { EMAIL_REGEX } from "../lib/utils";

export default function Login() {
  const router = useRouter();
  const user = useContext(UserContext);

  useEffect(() => {
    if (!!auth.currentUser) {
      router.push("/home");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onLogin(formData: any) {
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success(`Bienvenue`);
      router.push("/home");
    } catch (error) {
      toast.error(`Informations d'identification invalides`);
    }
  }

  return (
    <main className="form-signin w-100 m-auto">
      <p> {user?.displayName}</p>
      <p> {user?.email}</p>
      <p> {user?.userType}</p>

      {!user ? (
        <form
          id="sign-in-form"
          onSubmit={handleSubmit(onLogin)}
          className="text-center w-100 mt-5"
        >
          <Image
            className="logo"
            src="/berlin-logo.png"
            width={120}
            height={120}
            layout="fixed"
            alt="logo"
          />
          <h4 className="h4 mb-3 fw-normal">Connexion</h4>
          <section className="mb-2">
            <div className="form-floating mb-2">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                {...register("email", { required: true, pattern: EMAIL_REGEX })}
              />
              <label htmlFor="floatingInput">E-mail</label>
            </div>
            {errors.email && (
              <span style={{ color: "red" }}>
                E-mail manquant ou non valide.
              </span>
            )}
          </section>

          <section className="mb-4">
            <div className="form-floating mb-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Mot de passe"
                {...register("password", { required: true })}
              />
              <label htmlFor="floatingPassword">Mot de passe</label>
            </div>
            {errors.password && (
              <span style={{ color: "red" }}>
                Le mot de passe est manquant.
              </span>
            )}
          </section>

          <input
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            value="Connexion"
          />
          <p className="mt-5 mb-3 text-muted">&copy; 2022-2023</p>
        </form>
      ) : (
        <>
          <h1>Se déconnecter</h1>
          <input type="button" onClick={() => auth.signOut()} value="logout" />
        </>
      )}
    </main>
  );
}
