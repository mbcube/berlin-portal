import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";
import { User } from "./models/user.model";

export function useUserData() {
  const [authUser] = useAuthState(auth);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let unsubscribe;

    if (authUser) {
      const userDoc = doc(collection(firestore, "users"), authUser.uid);
      unsubscribe = onSnapshot(userDoc, (document) => {
        setUser({
          ...authUser,
          userType: document.data()?.userType,
          displayName: document.data()?.displayName,
        });
      });
    } else {
      setUser(null);
    }

    return unsubscribe;
  }, [authUser]);

  return user;
}
