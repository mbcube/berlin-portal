import { Toaster } from "react-hot-toast";
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
      <Navbar></Navbar>
      {children}
      <Toaster></Toaster>
    </>
  );
}
