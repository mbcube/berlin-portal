// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createUserWithEmailAndPassword } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../lib/firebase";
import { UserRequest, UserResponse } from "../../lib/models/api.model";
import { UserType } from "../../lib/models/user-type.enum";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>
) {
  if (req.method !== "POST") {
    res.status(404).end();
    return;
  }

  const request = req.body as UserRequest;

  if (
    !(
      request.authUser.stsTokenManager.accessToken &&
      request.authUser.stsTokenManager.expirationTime &&
      request.userType === UserType.Admin &&
      request.authUser.stsTokenManager.expirationTime > Date.now()
    )
  ) {
    res.status(401).end();
    return;
  }

  let randomPassword = (Math.random() + 1).toString(36).substring(2);
  // TODO: DELETE THIS BEFORE PROD *****************************************//
  randomPassword = "password";
  // TODO: DELETE THIS BEFORE PROD *****************************************//

  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      request.email,
      randomPassword
    );
    await auth.signOut();
    res.status(200).json({ uid: userCredentials.user.uid });
  } catch (error) {
    res.status(500).end();
  }
}
