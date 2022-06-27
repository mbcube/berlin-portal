import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";

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
