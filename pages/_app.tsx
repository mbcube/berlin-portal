import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { MainLayout, MinimalLayout } from "../components/layouts";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";

import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  const user = useUserData();
  const router = useRouter();
  const fullPageRoutes = ["/login", "/account-actions"];

  dynamic(import("bootstrap") as any, { ssr: false });

  if (router.route === "/") return <Component {...pageProps} />;

  return fullPageRoutes.includes(router.route) ||
    router.pathname === "/_error" ? (
    <MinimalLayout>
      <Component {...pageProps} />
    </MinimalLayout>
  ) : (
    <>
      <UserContext.Provider value={user}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </UserContext.Provider>
    </>
  );
}
