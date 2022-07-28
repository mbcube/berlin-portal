import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'
import { UserType } from '../lib/models/user-type.enum'
import styles from '../styles/Navbar.module.scss'

export default function Navbar() {
  const user = useContext(UserContext)
  const router = useRouter()

  return router.route === '/login' ? (
    <></>
  ) : (
    <nav id="sidebarMenu" className={styles.sidebar}>
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className={styles.navitem}>
            <a className={styles.navlink} aria-current="page" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-home align-text-bottom "
                aria-hidden="true"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>{' '}
              <p className={styles.p}>Feed</p>
            </a>
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
            <>
              <li className="nav-item">
                <a className={styles.navlink} href="/users/new">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-file align-text-bottom"
                    aria-hidden="true"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>

                  <p className={styles.p}> Create User</p>
                </a>
              </li>
              <li className="nav-item">
                <a className={styles.navlink} href="/users">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-users align-text-bottom"
                    aria-hidden="true"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>

                  <p className={styles.p}>User List</p>
                </a>
              </li>
              <li className="nav-item">
                <a className={styles.navlink} href="/courses">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-bar-chart-2 align-text-bottom"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>

                  <p className={styles.p}> Create Course</p>
                </a>
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
                <p onClick={() => auth.signOut()} className={styles.p1}>
                  {' '}
                  Logout &nbsp;
                  <i className="bi bi-box-arrow-right"></i>
                </p>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
