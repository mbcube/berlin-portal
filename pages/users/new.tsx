import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import toast from "react-hot-toast";
import AuthGuard from "../../components/auth-guard";
import UserForm from "../../components/forms/user-form";
import { UserContext } from "../../lib/context";
import { auth, database } from "../../lib/firebase";
import { UserType } from "../../lib/models/user-type.enum";

export default function NewUser() {
  const user = useContext(UserContext);

  async function onCreateUser(formData: any) {
    try {
      const uid = await createUser(formData.email);
      await createUserDocument(
        uid,
        formData.email,
        formData.displayName,
        formData.userType
      );
      toast.success(`Account Created`);
    } catch (error) {
      toast.error(`Unable to create account`);
    }
  }

  async function createUser(email: string): Promise<string> {
    const response = await axios.post("/api/firebase-api", {
      authUser: auth.currentUser,
      userType: user?.userType,
      email,
    });

    return response.data.uid;
  }

  async function createUserDocument(
    uid: string,
    email: string,
    displayName: string,
    userType: UserType
  ) {
    await setDoc(doc(database, "users", uid), {
      email,
      displayName,
      userType,
    });
  }

  return (
    <AuthGuard userTypes={[UserType.Admin, UserType.Teacher]}>
      <h1>Create User</h1>
      <UserForm
        onUserFormSubmitted={onCreateUser}
        heading="Create User"
      ></UserForm>
    </AuthGuard>
  );
}
