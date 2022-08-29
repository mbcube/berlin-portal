import { Student } from './course.model'
import { UserType } from './user-type.enum'

export interface UserInformation {
  id: string
  displayName: string
  email: string
  payment?: number
}
export interface User extends UserInformation {
  userType: UserType
}
