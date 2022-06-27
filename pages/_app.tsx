import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/navbar";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  const user = useUserData();

  return (
    <>
      <UserContext.Provider value={user}>
        <Navbar></Navbar>
        <Component {...pageProps} />
        <Toaster></Toaster>
      </UserContext.Provider>
    </>
  );
}
