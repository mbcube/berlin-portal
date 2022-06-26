import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthGuard from "../../../components/auth-guard";
import { UserContext } from "../../../lib/context";
import { auth, firestore } from "../../../lib/firebase";
import { UserResponse } from "../../../lib/models/api.model";
import { UserType } from "../../../lib/models/user-type.enum";
import { EMAIL_REGEX } from "../../../lib/utils";

export default function CreateUser() {
  const user = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onCreateUser(formData: any) {
    try {
      const uid = await createUser(formData.email);
      await createUserDocument(uid, formData.displayName, formData.userType);
      toast.success(`Account Created`);
    } catch (error) {
      toast.error(`Unable to create account`);
    }
  }

  async function createUser(email: string): Promise<string> {
    const response = await fetch("/api/firebase-api", {
      method: "POST",
      body: JSON.stringify({
        authUser: auth.currentUser,
        userType: user?.userType,
        email,
      }),
    });

    const data = (await response.json()) as UserResponse;
    return data.uid;
  }

  async function createUserDocument(
    userId: string,
    displayName: string,
    userType: UserType
  ) {
    await setDoc(doc(firestore, "users", userId), {
      displayName,
      userType,
    });
  }

  return (
    <AuthGuard userTypes={[UserType.Admin]}>
      <form onSubmit={handleSubmit(onCreateUser)}>
        <h1>New User</h1>
        <label>email</label>
        <input
          type="text"
          {...register("email", { required: true, pattern: EMAIL_REGEX })}
        />
        {errors.email && (
          <span style={{ color: "red" }}>Email is missing or invalid.</span>
        )}

        <br />
        <label>displayName</label>
        <input
          type="test"
          {...register("displayName", { required: true, minLength: 3 })}
        />
        {errors.displayName && (
          <span style={{ color: "red" }}>Display name if required</span>
        )}

        <br />
        <label htmlFor="cars">User Type:</label>
        <select {...register("userType")} defaultValue={UserType.Student}>
          <option value={UserType.Student}>{UserType.Student}</option>
          <option value={UserType.Teacher}>{UserType.Teacher}</option>
          <option value={UserType.Admin}>{UserType.Admin}</option>
        </select>
        {errors.userType && <p>UserType name is required.</p>}

        <br />
        <input type="submit" value="create" />
      </form>
    </AuthGuard>
  );
}
