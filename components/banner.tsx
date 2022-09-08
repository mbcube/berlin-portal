import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";
import { useMenuToggle } from "../lib/hooks";
import { UserTypeAvatar } from "./user-type-avatar";

export default function Banner() {
  const user = useContext(UserContext);
  const router = useRouter();
  const [isMenuVisible, setIsMenuVisible, elemntRef] = useMenuToggle();

  return (
    <header className="main-header p-3 m-auto bg-dark text-white zindex-popover">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        {user && (
          <button
            className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0"
            onClick={() => document.body.classList.toggle("sidenav-toggled")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}

        <Link href="/">
          <span className="navbar-brand d-flex align-items-center text-decoration-none ">
            <Image
              className=" d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none m-0"
              src="/berlin-logo.png"
              alt="logo"
              width="40"
              height="40"
            />

            <span className="navbar-brand pe-3 ps-4 ps-lg-2 text-decoration-none">
              Berlin House
            </span>
          </span>
        </Link>

        <ul className="navbar-nav align-items-center ms-auto">
          <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
            {user && (
              <>
                <a
                  onClick={() => setIsMenuVisible(!isMenuVisible)}
                  className="btn btn-icon btn-transparent-dark dropdown-toggle"
                  role="button"
                >
                  <UserTypeAvatar userType={user.userType} />
                </a>
                <div
                  ref={elemntRef}
                  className={`dropdown-menu dropdown-menu-end border-0 shadow animated-fade-in-up ${
                    isMenuVisible ? "show" : ""
                  }`}
                  style={{
                    position: "absolute",
                    inset: "0px 0px auto auto",
                    margin: "0px",
                    transform: "translate3d(0px, 46px, 0px)",
                  }}
                >
                  <h6 className="dropdown-header d-flex align-items-center">
                    <UserTypeAvatar userType={user.userType} />

                    <div className="dropdown-user-details ms-2">
                      <div className="dropdown-user-details-name">
                        {user.displayName}
                      </div>
                      <div className="dropdown-user-details-email">
                        {user.email}
                      </div>
                    </div>
                  </h6>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      auth.signOut();
                      router.push("/");
                    }}
                  >
                    <div className="dropdown-item-icon">
                      <i className="bi bi-box-arrow-right"></i>
                    </div>
                    Se déconnecter
                  </a>
                </div>
              </>
            )}
            {!user && (
              <Link href="/login">
                <button type="button" className="btn btn-outline-light">
                  Connexion
                </button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
