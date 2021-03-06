import Script from "next/script";
import { Toaster } from "react-hot-toast";
import Banner from "./banner";
import Navbar from "./navbar";

export function MinimalLayout({ children }: any) {
  return (
    <>
      {children}
      <Toaster toastOptions={{ duration: 8000 }}></Toaster>
    </>
  );
}

export function MainLayout({ children }: any) {
  return (
    <>
      <Script src="/scripts/vendor/sb-admin.js" />
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
  );
}
