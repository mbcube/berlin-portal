// <<<<<<< HEAD
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";
import { UserType } from "../lib/models/user-type.enum";
import styles from "../styles/Navbar.module.scss";

export default function Navbar() {
  const user = useContext(UserContext);
  const router = useRouter();

  return router.route === "/login" ? (
    <></>
  ) : (
    <nav className={styles.sidebar}>
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className={styles.navitem}>
            <Link href="/">
              <span className={styles.navlink} aria-current="page">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-home align-text-bottom "
                  aria-hidden="true"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>{" "}
                <p className={styles.p}>Feed</p>
              </span>
            </Link>
          </li>
          {!user && (
            <li className="nav-item">
              <Link href="/login">
                <p className={styles.p1}>Login</p>
              </Link>
            </li>
          )}
          {/*  admin specific nav items */}
          {user && user.userType === UserType.Admin && (
            // =======
            // import Link from "next/link";
            // import { useContext } from "react";
            // import { UserContext } from "../lib/context";
            // import { auth } from "../lib/firebase";
            // import { UserType } from "../lib/models/user-type.enum";

            // export default function Navbar() {
            //   const user = useContext(UserContext);

            //   return (
            //     <nav>
            //       <ul className="nav mt-1">
            //         <li className="nav-item">
            //           <Link href="/">
            //             <button type="button" className="btn btn-link">
            //               Feed
            //             </button>
            //           </Link>
            //           <Link href="/home">
            //             <button type="button" className="btn btn-link">
            //               Home
            //             </button>
            //           </Link>
            //         </li>
            //         {!user && (
            //           <li className="nav-item">
            //             <Link href="/login">
            //               <button type="button" className="btn btn-link">
            //                 Login
            //               </button>
            //             </Link>
            //           </li>
            //         )}
            //         {/*  admin specific nav items */}
            //         {user &&
            //           (user.userType === UserType.Admin ||
            //             user.userType === UserType.Teacher) && (
            // >>>>>>> 99172abcdae49085d0ed7417e6302b6c6511d251
            <>
              <li className="nav-item">
                <Link href="/users/new">
                  <span className={styles.navlink}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-file align-text-bottom"
                      aria-hidden="true"
                    >
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>

                    <p className={styles.p}> Create User</p>
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/users">
                  <span className={styles.navlink}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-users align-text-bottom"
                      aria-hidden="true"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>

                    <p className={styles.p}>User List</p>
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                {/* <<<<<<< HEAD */}
                <Link href="/courses">
                  <a className={styles.navlink}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-bar-chart-2 align-text-bottom"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>

                    <p className={styles.p}> Create Course</p>
                  </a>
                </Link>
                {/* =======
                <Link href="/courses/new">
                  <button type="button" className="btn btn-link">
                    Create Course
                  </button>
                </Link>
>>>>>>> 99172abcdae49085d0ed7417e6302b6c6511d251 */}
              </li>
              <li className="nav-item">
                <Link href="/courses">
                  <button type="button" className="btn btn-link">
                    Course List
                  </button>
                </Link>
              </li>
            </>
          )}
          {/* <<<<<<< HEAD */}
          {!!user && (
            <li className="nav-item">
              <Link href="/">
                <p onClick={() => auth.signOut()} className={styles.p1}>
                  Logout &nbsp;
                  <i className="bi bi-box-arrow-right"></i>
                </p>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
  // =======
  //         {!!user && (
  //           <li className="nav-item">
  //             <Link href="/">
  //               <button
  //                 onClick={() => auth.signOut()}
  //                 type="button"
  //                 className="btn btn-link d-flex"
  //               >
  //                 logout &nbsp;
  //                 <i className="bi bi-box-arrow-right"></i>
  //               </button>
  //             </Link>
  //           </li>
  //         )}
  //       </ul>
  //     </nav>
  //   );
  // >>>>>>> 99172abcdae49085d0ed7417e6302b6c6511d251
}
