import Image from "next/image";
import { UserType } from "../lib/models/user-type.enum";

export function UserTypeAvatar({ userType, width, height }: any) {
  if (userType == UserType.Admin)
    return (
      <Image
        className="img-account-profile rounded-circle"
        src={"/img/illustrations/profiles/profile-5.png"}
        alt=""
        width={50}
        height={50}
      />
    );

  if (userType == UserType.Teacher)
    return (
      <Image
        className="img-account-profile rounded-circle"
        src={"/img/illustrations/profiles/profile-3.png"}
        alt=""
        width={50}
        height={50}
      />
    );

  if (userType == UserType.Student)
    return (
      <Image
        className="img-account-profile rounded-circle"
        src={"/img/illustrations/profiles/profile-4.png"}
        alt=""
        width={50}
        height={50}
      />
    );

  return <></>;
}
