import { User } from 'firebase/auth'
import { Student } from './course.model'
import { UserType } from './user-type.enum'

interface TokenUser extends User {
  stsTokenManager: {
    accessToken: string
    expirationTime: number
  }
}

export type UserResponse = {
  uid: string
}

export type UserRequest = {
  authUser: TokenUser
  userType: UserType
  email: string
  studie: Student
  payment: number
}
