import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
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
          id: document.id,
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

export function useGetCollectionDocuments<T>(collectionName: string) {
  const [collectionDocuments, setCollectionDocuments] = useState<T[]>();

  useEffect(() => {
    const getDocuments = async () => {
      const documentQuery = await getDocs(
        query(collection(database, collectionName))
      );
      const documents = documentQuery.docs.map(
        (document) =>
          ({
            id: document.id,
            ...document.data(),
          } as any as T)
      );
      setCollectionDocuments(documents);
    };

    getDocuments();
  }, []);

  return collectionDocuments;
}
