import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from "./firebase";
import { User } from "./models/user.model";

export function useUserData() {
  const [authUser] = useAuthState(auth);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let unsubscribe;

    if (authUser) {
      const userDoc = doc(collection(database, "users"), authUser.uid);
      unsubscribe = onSnapshot(userDoc, (document) => {
        const data = document.data();
        setUser({
          id: data?.userType,
          userType: data?.userType,
          displayName: data?.displayName,
          email: data?.email,
        } as User);
      });
    } else {
      setUser(null);
    }

    return unsubscribe;
  }, [authUser]);

  return user;
}
