import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthGuard from "../../components/auth-guard";
import UserForm from "../../components/forms/user-form";
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
                    Update User
                  </h1>
                </div>
                <div className="col-auto col-xl-auto mb-3">
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
                <div className="card-header">Profile Picture</div>
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
                <div className="card-header">Account Details</div>
                <div className="card-body">
                  <UserForm
                    onUserFormSubmitted={onEditUser}
                    initialFormData={userState}
                    heading="Edit User"
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
