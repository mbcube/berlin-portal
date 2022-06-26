import Link from "next/link";
import { UserType } from "../lib/models/user-type.enum";
import { User } from "../lib/models/user.model";
import { UserContext } from "../lib/context";
import { useContext } from "react";
import { auth } from "../lib/firebase";

export default function Navbar() {
  const user = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        {user && <li>{user.displayName}</li>}
        <li>
          <Link href="/">
            <button>Feed</button>
          </Link>
        </li>
        {!!user && (
          <li>
            <button onClick={() => auth.signOut()}>Logout</button>
          </li>
        )}
        {!user && (
          <li>
            <Link href="/login">
              <button>Login</button>
            </Link>
          </li>
        )}
        {/*  admin specific nav items */}
        {user && user.userType === UserType.Admin && (
          <>
            <li>
              <Link href="/admin/users">
                <button>Create User</button>
              </Link>
            </li>
            <li>
              <Link href="/">
                <button>admin link 2</button>
              </Link>
            </li>
            <li>
              <Link href="/">
                <button>admin link 3</button>
              </Link>
            </li>
          </>
        )}
        {/*  admin specific nav items */}
        {user && user.userType === UserType.Teacher && (
          <>
            <li>
              <Link href="/">
                <button>treacher link 1</button>
              </Link>
            </li>
            <li>
              <Link href="/">
                <button>treacher link 2</button>
              </Link>
            </li>
            <li>
              <Link href="/">
                <button>treacher link 3</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
