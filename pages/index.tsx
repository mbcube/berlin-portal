import router from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";

const Landing = () => {
  const user = useContext(UserContext);

  useEffect(() => {
    if (!!user) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, []);

  return <></>;
};

export default Landing;
