import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Landing = () => {
  const { t } = useTranslation("common");

  return (
    <>
      {/* Page Header*/}
      <header
        className="page-header-ui page-header-ui-dark bg-img-cover overlay overlay-80"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/faEfWCdOKIg/1500x900')",
        }}
      >
        <div className="page-header-ui-content py-5 position-relative">
          <div className="container px-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-xl-8 col-lg-10 text-center">
                <div data-aos="fade-up">
                  <h1 className="page-header-ui-title">
                    {t("workStudyTitle")} <br />
                  </h1>
                  <p className="page-header-ui-text">{t("learnHeader")}</p>
                </div>
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
      <section className="bg-white py-10" id="get-started">
        <div className="container px-5">
          <div className="row gx-5 text-center">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="icon-stack icon-stack-xl bg-gradient-warning-to-secondary text-white mb-4">
                <i className="bi bi-translate  text-black"></i>{" "}
              </div>
              <h2> {t("learnTitle")}</h2>
              <p className="mb-0">{t("learnDescription")}</p>
            </div>
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="icon-stack icon-stack-xl bg-gradient-warning-to-secondary text-white mb-4">
                <i className="bi bi-book  text-black"></i>
              </div>
              <h2> {t("studyTitle")}</h2>
              <p className="mb-0">{t("studyDescription")}</p>
            </div>
            <div className="col-lg-4">
              <div className="icon-stack icon-stack-xl bg-gradient-warning-to-secondary text-white mb-4">
                <i className="bi bi-person-workspace  text-black"></i>
              </div>
              <h2> {t("workTitle")}</h2>
              <p className="mb-0">{t("workDescription")}</p>
            </div>
          </div>
        </div>
        <div className="svg-border-rounded text-light">
          {/* Rounded SVG Border*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 144.54 17.34"
            preserveAspectRatio="none"
            fill="rgba(var(--bs-light-rgb), var(--bs-bg-opacity))"
          >
            <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path>
          </svg>
        </div>
      </section>
      <section className="bg-light py-10">
        <div className="container px-5">
          <div className="row gx-5 brands text-gray-500 align-items-center mb-5">
            <div></div>
          </div>
          <div className="row gx-5 justify-content-center z-1">
            <div className="col-lg-8" data-aos="fade-up">
              <div className="card lift mb-n15">
                <div className="card-body p-2 pb-1">
                  <iframe
                    height={400}
                    className="w-100"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.20751617683!2d-6.924260384720048!3d33.91005833265681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda70dc765b60a49%3A0x35013bcae8c3771f!2sBerlin%20House!5e0!3m2!1sen!2sma!4v1659546386402!5m2!1sen!2sma"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-img-cover overlay overlay-80 py-10"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/yTwXpLO5HAA/1500x900')",
        }}
      >
        <div className="container px-5 position-relative">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-10">
              <div className="display-6 text-center py-10 my-10 text-white">
                {t("firstDivParag")}{" "}
                <span className="text-warning">{t("secondDivParag")}</span>{" "}
                {t("thirddivParag")}{" "}
                <span className="text-warning">{t("fourthdivParag")}</span>{" "}
                {t("lastdivParag")}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-10">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10 text-center my-10 py-10">
              <h2> {t("supportTitle")}</h2>
              <a
                className="btn btn-warning fw-500"
                href="https://www.facebook.com/BerlinHousetemara"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {t("contactUs")}
              </a>
            </div>
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

export default Landing;
