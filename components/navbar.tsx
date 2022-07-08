import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";
import { UserType } from "../lib/models/user-type.enum";

export default function Navbar() {
  const user = useContext(UserContext);
  const router = useRouter();

  return router.route === "/login" ? (
    <></>
  ) : (
    <nav>
      <ul className="nav mt-1">
        <li className="nav-item">
          <Link href="/">
            <button type="button" className="btn btn-link">
              Feed
            </button>
          </Link>
          <Link href="/home">
            <button type="button" className="btn btn-link">
              Home
            </button>
          </Link>
        </li>
        {!user && (
          <li className="nav-item">
            <Link href="/login">
              <button type="button" className="btn btn-link">
                Login
              </button>
            </Link>
          </li>
        )}
        {/*  admin specific nav items */}
        {user &&
          (user.userType === UserType.Admin ||
            user.userType === UserType.Teacher) && (
            <>
              <li className="nav-item">
                <Link href="/users/new">
                  <button type="button" className="btn btn-link">
                    Create User
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/users">
                  <button type="button" className="btn btn-link">
                    User List
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/courses/new">
                  <button type="button" className="btn btn-link">
                    Create Course
                  </button>
                </Link>
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
        {!!user && (
          <li className="nav-item">
            <Link href="/">
              <button
                onClick={() => auth.signOut()}
                type="button"
                className="btn btn-link d-flex"
              >
                logout &nbsp;
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
