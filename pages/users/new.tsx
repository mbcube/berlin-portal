import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
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
      <main>
        <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
          <div className="container-xl px-4">
            <div className="page-header-content">
              <div className="row align-items-center justify-content-between pt-3">
                <div className="col-auto mb-3">
                  <h1 className="page-header-title">
                    <div className="page-header-icon">
                      <i data-feather="user-plus"></i>
                    </div>
                    Add User
                  </h1>
                </div>
                <div className="col-12 col-xl-auto mb-3">
                  <Link href="/users">
                    <a className="btn btn-sm btn-light text-primary">
                      <i className="me-1" data-feather="arrow-left"></i>
                      Back to Users List
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Main page content*/}
        <div className="container-xl px-4 mt-4">
          <div className="row">
            <div className="col-xl-4">
              {/* Profile picture card*/}
              <div className="card mb-4 mb-xl-0">
                {/* <div className="card-header">Profile Picture</div> */}
                <div className="card-body text-center">
                  {/* Profile picture htmlFor=*/}
                  <Image
                    className="img-account-profile rounded-circle"
                    src="/img/demo/user-placeholder.svg"
                    alt=""
                    layout="fixed"
                    width={150}
                    height={150}
                  />
                  {/* Profile picture help block*/}
                  <div className="small font-italic text-muted mb-4">
                    JPG or PNG no larger than 5 MB
                  </div>
                  {/* Profile picture upload button*/}
                  <button className="btn btn-primary" type="button">
                    Upload new image
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              {/* Account details card*/}
              <div className="card mb-4">
                {/* <div className="card-header">Account Details</div> */}
                <div className="card-body">
                  <UserForm
                    onUserFormSubmitted={onCreateUser}
                    heading="Create User"
                  ></UserForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
