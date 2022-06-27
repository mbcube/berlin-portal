import { signInWithEmailAndPassword } from 'firebase/auth'
import { useContext } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
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
        <Container id="main-container" className="d-grid h-100">
          <form
            id="sign-in-form"
            onSubmit={handleSubmit(onLogin)}
            className="text-center w-100"
          >
            <img
              className=" mb-3 logo"
              src="289601895_562604481988921_7478013047047048154_n.jpg"
              alt="logo"
            />
            <h1 className=" mb-3 fs-3  fw-normal">Login</h1>

            <Form.Group controlId="sign-in-type-email">
              <Form.Control
                type="email"
                size="lg"
                placeholder="Type email"
                autoComplete="username"
                className="position-relative"
                {...register('email', { required: true, pattern: EMAIL_REGEX })}
              />
            </Form.Group>

            {errors.email && (
              <span style={{ color: 'red' }}>Email is missing or invalid.</span>
            )}

            <Form.Group controlId="sign-in-type-password" className="mb-3">
              <Form.Control
                type="password"
                size="lg"
                placeholder="Type password"
                autoComplete="current-password"
                className="position-relative"
                {...register('password', { required: true })}
              />
            </Form.Group>
            <Form.Group
              controlId="remember-me"
              className="d-flex justify-content-center mb-4"
            >
              <Form.Check label="Remember me" />
            </Form.Group>

            {errors.password && (
              <span style={{ color: 'red' }}>Password is missing.</span>
            )}
            <br />
            <div className="d-grid">
              <Button variant="primary" size="lg" type="submit" value="login">
                login
              </Button>
            </div>
            <p className="mt-5" text-muted>
              &copy; 2022-2023
            </p>
          </form>
        </Container>
      ) : (
        <>
          <h1>Logout</h1>
          <input type="button" onClick={() => auth.signOut()} value="logout" />
        </>
      )}
    </main>
  )
}
