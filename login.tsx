import { signInWithEmailAndPassword } from 'firebase/auth'
import { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'
import { EMAIL_REGEX } from '../lib/utils'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const user = useContext(UserContext)

  async function onLogin(formData: any) {
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      toast.success(`Welcome`)
    } catch (error) {
      toast.error(`Invalid Credentials`)
    }
  }

  return (
    <main className="form-signin w-100 m-auto">
      <p> {user?.displayName}</p>
      <p> {user?.email}</p>
      <p> {user?.userType}</p>

      {!user ? (
        <form
          id="sign-in-form"
          onSubmit={handleSubmit(onLogin)}
          className="text-center w-100"
        >
          <img className=" mb-3 logo" src="2.png" alt="logo" />
          <h1 className="h3 mb-3 fw-normal">Login</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
             
              {...register('email', { required: true, pattern: EMAIL_REGEX })}
            />
            <label htmlFor="floatingInput">Type Email</label>
          </div>
          {errors.email && (
            <span style={{ color: 'red' }}>Email is missing or invalid.</span>
          )}

          <div className="form-floating">
            <input
              type="password"
              className="form-control mb-3"
              id="floatingPassword"
              placeholder="Password"
              {...register('password', { required: true })}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {errors.password && (
            <span style={{ color: 'red' }}>Password is missing.</span>
          )}

          <div className="checkbox mb-3 ">
            <label>
              <input type="checkbox" className="box" value="remember-me" />
              Remember me
            </label>
          </div>

          <Button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            value="login"
          >
            login
          </Button>

          <p className="mt-5 mb-3 text-muted">&copy; 2022-2023</p>
        </form>
      ) : (
        <>
          <h1>Logout</h1>
          <input type="button" onClick={() => auth.signOut()} value="logout" />
        </>
      )}
    </main>
  )
}
