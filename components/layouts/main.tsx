import ErrorPage from "next/error";
import { Toaster } from "react-hot-toast";
import Banner from "../banner";
import Navbar from "../navbar";

export function MainLayout({ user, children }: any) {
  return (
    <>
      {!user?.id && <ErrorPage statusCode={401} />}
      {user?.id && (
        <>
          <Banner />
          <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
              <Navbar />
            </div>
            <div id="layoutSidenav_content">
              <section className="main-section">{children}</section>
            </div>
          </div>
          <Toaster />
        </>
      )}
    </>
  );
}
