import Image from 'next/image'
export default function Banner() {
  return (
    <header className="main-header p-3 m-auto bg-dark text-white ">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <button
          className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0"
          id="sidebarToggle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <Image
          className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none "
          src="/berlin-logo.png"
          alt="logo"
          width="40"
          height="40"
        />

        <a className="navbar-brand pe-3 ps-4 ps-lg-2" href="/">
          Berlin House
        </a>

        <ul className="navbar-nav align-items-center ms-auto">
          <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
            <a
              className="btn btn-icon btn-transparent-dark dropdown-toggle"
              id="navbarDropdownUserImage"
              href="javascript:void(0);"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <Image
                className="img-account-profile rounded-circle"
                src="/img/demo/user-placeholder.svg"
                alt=""
                layout="fixed"
                width={150}
                height={150}
              />
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
