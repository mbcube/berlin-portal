<<<<<<< HEAD
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import Banner from '../components/Banner'
import Navbar from '../components/navbar'
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'
import '../styles/globals.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  const user = useUserData()
  return (
=======
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/navbar";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  const user = useUserData();
  const router = useRouter();
  const fullPageRoutes = ["/login", "/account-actions"];

  return fullPageRoutes.includes(router.route) ||
    router.pathname === "/_error" ? (
    <>
      <Component {...pageProps} />
      <Toaster toastOptions={{ duration: 8000 }}></Toaster>
    </>
  ) : (
>>>>>>> 99172abcdae49085d0ed7417e6302b6c6511d251
    <>
      <UserContext.Provider value={user}>
        <Banner></Banner>
         <Navbar></Navbar>

        <Component {...pageProps} />

        <Toaster></Toaster>
      </UserContext.Provider>
    </>
  )
}
