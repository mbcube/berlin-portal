import { useTranslation } from "next-i18next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export function PublicLayout({ children }: any) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link href="/sb-kit.css" rel="stylesheet" key="test" />
      </Head>
      <div id="layoutDefault">
        <div id="layoutDefault_content">
          <main>
            <nav className="navbar navbar-marketing navbar-expand-lg bg-white navbar-light">
              <div className="container px-5">
                <Link href="/">
                  <a className="navbar-brand d-flex align-items-center">
                    <Image
                      className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none m-0"
                      src="/berlin-logo.png"
                      alt="logo"
                      width="50"
                      height="50"
                    />
                    <span className="navbar-brand ms-2">
                      Berlin House {t("example")}
                    </span>
                  </a>
                </Link>

                <div
                  className="collapse navbar-collapse  "
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ms-auto me-lg-6"></ul>
                </div>
                <Link href="/login">
                  <a className="btn fw-500 ms-lg-4    btn-warning">
                    Login
                    <button
                      className="navbar-toggler "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <i data-feather="menu"></i>
                    </button>
                  </a>
                </Link>
              </div>
            </nav>
            {children}
          </main>
        </div>
        <div id="layoutDefault_footer">
          <footer className="footer pt-10 pb-5 mt-auto bg-black footer-dark">
            <div className="container px-5">
              <div className="row gx-5">
                <div className="col-lg-3">
                  <div className="footer-brand">Berlin House</div>
                  <div className="mb-3">Deine Zukunft in Deutschland</div>
                  <div className="icon-list-social mb-5">
                    <a className="icon-list-social-link" href="#!">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a className="icon-list-social-link" href="#!">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a className="icon-list-social-link" href="#!">
                      <i className="fab fa-github"></i>
                    </a>
                    <a className="icon-list-social-link" href="#!">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row gx-5">
                    <div className="col-lg-3 col-md-6 mb-5 mb-lg-0"></div>
                    <div className="col-lg-3 col-md-6 mb-5 mb-lg-0"></div>
                    <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
                      <div className="text-uppercase-expanded text-xs mb-4">
                        {/* Includes */}
                      </div>
                      <ul className="list-unstyled mb-0"></ul>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="text-uppercase-expanded text-xs mb-4">
                        Legal
                      </div>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-2">
                          <a href="#!">Privacy Policy</a>
                        </li>
                        <li className="mb-2">
                          <a href="#!">Terms and Conditions</a>
                        </li>
                        <li>
                          <a href="#!">License</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-5" />
              <div className="row gx-5 align-items-center">
                <div className="col-md-6 small">
                  Copyright &copy; Berlin House 2022
                </div>
                <div className="col-md-6 text-md-end small">
                  <a href="#!">Privacy Policy</a>
                  &middot;
                  <a href="#!">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        crossOrigin="anonymous"
      />
      <Script src="js/scripts.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/lity/2.4.0/lity.min.js" />
      <Script src="https://unpkg.com/aos@next/dist/aos.js" />
    </>
  );
}
