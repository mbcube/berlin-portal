import Link from "next/link";
import { UserType } from "../lib/models/user-type.enum";
import { User } from "../lib/models/user.model";
import { UserContext } from "../lib/context";
import { useContext } from "react";
import { auth } from "../lib/firebase";

export default function Navbar() {
  const user = useContext(UserContext);

  return (
    <nav>
      <ul className="nav mt-1">
        <li className="nav-item">
          <Link href="/">
            <button type="button" className="btn btn-link">
              Feed
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
        {user && user.userType === UserType.Admin && (
          <>
            <li className="nav-item">
              <Link href="/admin/users">
                <button type="button" className="btn btn-link">
                  Create User
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <button type="button" className="btn btn-link">
                  admin link 2
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <button type="button" className="btn btn-link">
                  admin link 3
                </button>
              </Link>
            </li>
          </>
        )}
        {/*  admin specific nav items */}
        {user && user.userType === UserType.Teacher && (
          <>
            <li className="nav-item">
              <Link href="/">
                <button type="button" className="btn btn-link">
                  treacher link 1
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <button type="button" className="btn btn-link">
                  treacher link 2
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <button type="button" className="btn btn-link">
                  treacher link 3
                </button>
              </Link>
            </li>
          </>
        )}
        {!!user && (
          <li className="nav-item">
            <Link href="/">
              <button type="button" className="btn btn-link d-flex">
                {user?.displayName}
                &nbsp;
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
