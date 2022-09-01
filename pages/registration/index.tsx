import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { database } from "../../lib/firebase";
import {
  Registration,
  RegistrationItem,
} from "../../lib/models/registration.model";
import { DATE_FORMAT, EMAIL_REGEX, PHONE_REGEX } from "../../lib/utils";

const Registration = () => {
  const { t } = useTranslation("common");
  const [formState, setFormState] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmitForm(formData: any) {
    setFormState({ isLoading: true, isSuccess: false, isError: false });
    const filePath = await uploadFile(formData as Registration);
    if (filePath === "") {
      setFormState({ isLoading: false, isSuccess: false, isError: true });
      return;
    }
    const isCreated = await createRegistrationDocument(
      formData as Registration,
      filePath
    );

    if (!isCreated) {
      setFormState({ isLoading: false, isSuccess: false, isError: true });
      return;
    }

    setFormState({ ...formState, isLoading: false, isSuccess: true });
  }

  async function uploadFile(registration: Registration): Promise<string> {
    if (registration.resume.length == 0) return "";

    try {
      const storage = getStorage();
      const storageRef = ref(storage, "resumes/" + registration.resume[0].name);
      const fileResponse = await uploadBytes(
        storageRef,
        registration.resume[0]
      );
      return fileResponse.ref.fullPath;
    } catch {
      setFormState({ isLoading: false, isSuccess: false, isError: true });
      return "";
    }
  }

  async function createRegistrationDocument(
    registration: Registration,
    filePath: string
  ): Promise<boolean> {
    try {
      await updateDoc(doc(database, "registration", "registration-0"), {
        registration: arrayUnion({
          fullName: registration.fullName,
          email: registration.email,
          phone: registration.phone,
          address: registration.address,
          comments: registration.comments,
          resume: filePath,
          createdDate: moment().utc().format(DATE_FORMAT),
        } as RegistrationItem),
      });
      return true;
    } catch {
      setFormState({ isLoading: false, isSuccess: false, isError: true });
      return false;
    }
  }

  return (
    <>
      <header
        className="page-header-ui page-header-ui-dark bg-img-cover overlay overlay-80 pt-5"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/faEfWCdOKIg/1500x900')",
        }}
      >
        <div className="page-header-ui-content pt-5 position-relative">
          <div className="container">
            <div className="row gx-5 justify-content-center">
              <div className="col-xl-8 col-lg-10 text-center">
                <h1 className="page-header-ui-title">
                  {t("registration.registration-form")}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="svg-border-rounded text-white">
          {/* Rounded SVG Border*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 144.54 17.34"
            preserveAspectRatio="none"
            fill="white"
          >
            <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path>
          </svg>
        </div>
      </header>
      <section className="bg-white py-10">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center z-1">
            <div className="col-lg-8" data-aos="fade-up">
              <div className="card mb-n15">
                <div className="card-body px-3 py-4">
                  {!formState.isSuccess && (
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                      <div className="row gx-5 mb-4">
                        <div className="col-md-6">
                          <label className="text-dark mb-2" htmlFor="inputName">
                            {t("registration.full-name")}
                          </label>
                          <input
                            className="form-control"
                            id="inputName"
                            type="text"
                            placeholder={t("registration.full-name")}
                            {...register("fullName", {
                              required: true,
                              minLength: 5,
                            })}
                          />
                          {errors.fullName && (
                            <label className="mt-1" style={{ color: "red" }}>
                              {t("registration.errors.full-name")}
                            </label>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label
                            className="text-dark mb-2 mt-3 mt-md-0"
                            htmlFor="inputEmail"
                          >
                            {t("registration.email")}
                          </label>
                          <input
                            className="form-control "
                            id="inputEmail"
                            type="email"
                            placeholder={t("registration.email-example")}
                            {...register("email", {
                              required: true,
                              pattern: EMAIL_REGEX,
                            })}
                          />
                          {errors.email && (
                            <label className="mt-1" style={{ color: "red" }}>
                              {t("registration.errors.email")}
                            </label>
                          )}
                        </div>
                      </div>
                      <div className="row gx-5 mb-4">
                        <div className="col-md-6">
                          <label
                            className="text-dark mb-2"
                            htmlFor="inputPhone"
                          >
                            {t("registration.phone")}
                          </label>
                          <input
                            className="form-control"
                            id="inputPhone"
                            type="phone"
                            placeholder={t("registration.phone")}
                            {...register("phone", {
                              required: true,
                              pattern: PHONE_REGEX,
                            })}
                          />
                          {errors.phone && (
                            <label className="mt-1" style={{ color: "red" }}>
                              {t("registration.errors.phone")}
                            </label>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label
                            className="text-dark mb-2 mt-3 mt-md-0"
                            htmlFor="inputAddress"
                          >
                            {t("registration.address")}
                          </label>
                          <input
                            className="form-control "
                            id="inputAddress"
                            type="text"
                            placeholder={t("registration.address")}
                            {...register("address")}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          className="text-dark mb-2"
                          htmlFor="inputComments"
                        >
                          {t("registration.comments")}
                        </label>
                        <textarea
                          className="form-control"
                          id="inputComments"
                          placeholder={t("registration.comments")}
                          rows={4}
                          {...register("comments")}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="text-dark mb-2" htmlFor="inputResume">
                          {t("registration.resume")}
                          <small className="text-gray-500">
                            {" "}
                            (.pdf, .doc, .docx)
                          </small>
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="inputResume"
                          accept="application/pdf, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          {...register("resume", { required: true })}
                        ></input>
                        {errors.resume && (
                          <label className="mt-1" style={{ color: "red" }}>
                            {t("registration.errors.resume")}
                          </label>
                        )}
                      </div>
                      {formState.isError && (
                        <label className="mt-1" style={{ color: "red" }}>
                          {t("registration.error")}{" "}
                        </label>
                      )}
                      <div className="text-center">
                        <button
                          disabled={formState.isLoading}
                          className="btn btn-warning mt-4"
                          type="submit"
                        >
                          {formState.isLoading && (
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          )}
                          {t("registration.submit")}
                        </button>
                      </div>
                    </form>
                  )}

                  {formState.isSuccess && (
                    <div
                      className="alert alert-success d-flex align-items-center"
                      role="alert"
                    >
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <div>{t("registration.success")}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-10" id="get-started">
        <div className="container px-5">
          <div className="row gx-5 text-center">
            <div className="col-lg-8 offset-lg-2 mb-5 mb-lg-0"></div>
          </div>
        </div>
        <div className="svg-border-rounded text-black">
          {/* Rounded SVG Border*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 144.54 17.34"
            preserveAspectRatio="none"
            fill="black"
          >
            <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path>
          </svg>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Registration;
