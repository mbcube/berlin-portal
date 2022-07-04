import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthGuard from "../../components/auth-guard";
import UserForm from "../../components/user-form";
import { database } from "../../lib/firebase";
import { UserType } from "../../lib/models/user-type.enum";
import { User } from "../../lib/models/user.model";

export default function EditUser() {
  const router = useRouter();

  const [userState, setUserState] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      if (!router.query.userId) return;
      const userDocument = await getDoc(
        doc(database, "users", `${router.query.userId}`)
      );
      const user = {
        id: router.query.userId,
        ...userDocument.data(),
      } as User;

      console.log(user);

      setUserState(user);
    };

    getUser();
  }, [router.query.userId]);

  async function onEditUser(formData: any) {
    try {
      await setDoc(doc(database, "users", userState?.id || ""), {
        email: formData.email,
        displayName: formData.displayName,
        userType: formData.userType,
      });

      toast.success(`Account updated`);
    } catch (error) {
      toast.error(`Unable to update account`);
    }
  }
  return (
    <AuthGuard userTypes={[UserType.Admin, UserType.Teacher]}>
      <h1>Update User</h1>
      <UserForm
        onUserFormSubmitted={onEditUser}
        heading="Edit User"
        initialFormData={userState}
      ></UserForm>
    </AuthGuard>
  );
}
