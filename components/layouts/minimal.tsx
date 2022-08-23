import { Toaster } from "react-hot-toast";

export function MinimalLayout({ children }: any) {
  return (
    <>
      <div className="main-section">{children}</div>
      <Toaster toastOptions={{ duration: 8000 }}></Toaster>
    </>
  );
}
