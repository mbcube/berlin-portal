import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  QueryConstraint,
  where,
} from "firebase/firestore";
import moment from "moment";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserContext } from "./context";
import { auth, database } from "./firebase";
import { Course } from "./models/course.model";
import { Home } from "./models/home.model";
import { Session } from "./models/session.model";
import { User } from "./models/user.model";
import { DATE_FORMAT, DATE_KEY_FORMAT } from "./utils";

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
          payment: data?.payment,
        } as User);
      });
    } else {
      setUser(null);
    }

    return unsubscribe;
  }, [authUser]);

  return user;
}

export interface CollectionDocumentHookFilters {
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export function useGetCollectionDocuments<T>(
  collectionName: string,
  filters?: CollectionDocumentHookFilters
) {
  const [collectionDocuments, setCollectionDocuments] = useState<T[]>();

  useEffect(() => {
    const getDocuments = async () => {
      const buildConstraints: QueryConstraint[] = [];

      if (filters?.limit) {
        buildConstraints.push(limit(filters?.limit));
      }

      if (filters?.startDate) {
        buildConstraints.push(
          where(
            "timestamp",
            ">=",
            moment(filters.startDate, DATE_FORMAT).unix()
          )
        );
      }
      if (filters?.endDate) {
        buildConstraints.push(
          where("timestamp", ">=", moment(filters.endDate, DATE_FORMAT).unix())
        );
      }

      const documentQuery = await getDocs(
        query(collection(database, collectionName), ...buildConstraints)
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

export function useHomeData() {
  const [homeData, setHomeData] = useState<Home>({} as Home);
  const user = useContext(UserContext);
  const todayKey = moment.utc().format(DATE_KEY_FORMAT);

  useEffect(() => {
    const getHomeData = async () => {
      const coursesQuery = await getDocs(
        query(
          collection(database, "courses"),
          where("enrollments", "array-contains", user?.id)
        )
      );

      const courses = coursesQuery.docs.map(
        (document) =>
          ({
            id: document.id,
            courseName: document.data().courseName,
            startDate: document.data().startDate,
            endDate: document.data().endDate,
            daysOfTheWeek: document.data().daysOfTheWeek,
            teachers: document.data().teachers,
            students: document.data().students,
          } as Course)
      );

      let sessions: Session[] = [];
      let todaySessions: Session[] = [];

      if (courses.length != 0) {
        const sessionDocuments = await Promise.all(
          courses.map(
            async (course) => await getDoc(doc(database, "sessions", course.id))
          )
        );
        sessions = sessionDocuments
          .filter((sessionDocument) => sessionDocument.exists())
          .map((sessionDocument) => sessionDocument.data() as Session);

        todaySessions = sessions.filter(
          (mySession) =>
            mySession &&
            mySession.sessions &&
            Object.keys(mySession.sessions).includes(todayKey)
        );
      }

      setHomeData({
        user: user,
        myCourses: courses,
        mySessions: sessions,
        todaysSessions: todaySessions,
        todayKey: todayKey,
      } as Home);
    };

    getHomeData();
  }, [user]);

  return homeData;
}

export function useMenuToggle() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const elementRef = useRef<any>();

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        isMenuVisible &&
        elementRef.current &&
        !elementRef.current.contains(e.target)
      ) {
        setIsMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuVisible]);

  return [isMenuVisible, setIsMenuVisible, elementRef] as [
    boolean,
    Dispatch<SetStateAction<boolean>>,
    MutableRefObject<any>
  ];
}
