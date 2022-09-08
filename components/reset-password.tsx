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
        `Quelque chose s'est mal passé, veuillez générer un nouveau lien et réessayer.`
      );
      return;
    }

    if (formData["password"] !== formData["verifyPassword"]) {
      setError("verifyPassword", {
        type: "manual",
        message: "Les mots de passe ne correspondent pas",
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
        `Votre mot de passe a réinitialisé Ben, connectez-vous avec votre nouveau mot de passe.`
      );
      router.push("/login");
    } catch (error) {
      toast.error(
        `Quelque chose s'est mal passé, veuillez générer un nouveau lien et réessayer.`
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
        <h4 className="h4 mb-2 fw-normal">Réinitialisez votre mot de passe</h4>
        <h6 className="h6 mb-4 fw-normal">{router.query.email}</h6>
        <div className="form-floating">
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Mot de passe"
            {...register("password", { required: true })}
          />
          <label htmlFor="floatingPassword">Mot de passe</label>
        </div>
        {errors.password && (
          <label className="mb-2 text-danger">
            Le mot de passe est manquant.
          </label>
        )}

        <div className="form-floating">
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Entrez à nouveau le mot de passe"
            {...register("verifyPassword", { required: true })}
          />
          <label htmlFor="floatingPassword">
            Entrez à nouveau le mot de passe
          </label>
        </div>
        {errors.verifyPassword && (
          <label className="mb-2 text-danger">
            {errors.verifyPassword.message || "Le mot de passe est manquant."}
          </label>
        )}

        <input
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          value="Réinitialiser"
        />
        <p className="mt-5 mb-3 text-muted">&copy; 2022-2023</p>
      </form>
    </main>
  );
}
