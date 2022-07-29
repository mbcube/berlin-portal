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
      <Banner />
      <Navbar />
      <section className="main-section">{children}</section>
      <Toaster />
    </>
  );
}
