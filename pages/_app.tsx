import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Landing from ".";
import { MainLayout } from "../components/layouts/main";
import { MinimalLayout } from "../components/layouts/minimal";
import { PublicLayout } from "../components/layouts/public";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";

import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const user = useUserData();
  const router = useRouter();
  const fullPageRoutes = ["/login", "/account-actions"];
  const publicRoutes = ["/", "/registration"];

  dynamic(import("bootstrap") as any, { ssr: false });

  if (router.route == "/")
    return (
      <UserContext.Provider value={user}>
        <Landing />
      </UserContext.Provider>
    );

  if (publicRoutes.includes(router.route))
    return (
      <PublicLayout>
        <Component {...pageProps} />
      </PublicLayout>
    );

  return fullPageRoutes.includes(router.route) ||
    router.pathname === "/_error" ? (
    <MinimalLayout>
      <Component {...pageProps} />
    </MinimalLayout>
  ) : (
    <>
      <UserContext.Provider value={user}>
        <MainLayout user={user}>
          <Component {...pageProps} />
        </MainLayout>
      </UserContext.Provider>
    </>
  );
};

export default appWithTranslation(MyApp);
