import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UserType } from '../../lib/models/user-type.enum'
import { EMAIL_REGEX } from '../../lib/utils'

export default function UserForm({
  onUserFormSubmitted,
  initialFormData,
}: any) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()
  const userTypeWatch = watch('userType')

  async function onCreateUser(formData: any) {
    onUserFormSubmitted(formData)
  }

  useEffect(() => {
    reset(initialFormData)
  }, [initialFormData, reset])

  return (
    <form onSubmit={handleSubmit(onCreateUser)}>
      {/* Form Row*/}
      <div className="row gx-3 mb-3">
        {/* Form Group (first name)*/}
        <div className="col-md-6">
          <label className="small mb-1" htmlFor="inputFirstName">
            Display Name
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter the display name"
            {...register('displayName', {
              required: true,
              minLength: 3,
            })}
          />
          {errors.displayName && (
            <label className="mt-2" style={{ color: 'red' }}>
              Display name is required
            </label>
          )}
        </div>
      </div>
      {/* Form Group (email address)*/}
      <div className="col-md-6 mb-3">
        <label className="small mb-1" htmlFor="inputEmailAddress">
          Email address
        </label>
        <input
          className="form-control"
          type="email"
          placeholder="Enter the email address"
          {...register('email', {
            required: true,
            pattern: EMAIL_REGEX,
          })}
        />
        {errors.email && (
          <label className="mt-1" style={{ color: 'red' }}>
            Email is missing or invalid.
          </label>
        )}
      </div>

      {/* Form Group (Roles)*/}
      <div className="col-md-6 mb-3">
        <label className="small mb-1">Role</label>

        <select
          className="form-select"
          {...register('userType', { value: UserType.Student })}
        >
          <option disabled>Select a role:</option>
          <option value={UserType.Student}>{UserType.Student}</option>
          <option value={UserType.Teacher}>{UserType.Teacher}</option>
          <option value={UserType.Admin}>{UserType.Admin}</option>
        </select>
        {errors.userType && <p>Role is required.</p>}
      </div>
      {/* Form Group (Payment)*/}
      {userTypeWatch && userTypeWatch == UserType.Student && (
        <div className="col-md-6 mb-3">
          <label
            className="small mb-1"
            htmlFor="inputPayment"
            {...register('Payment')}
          >
            Payment
          </label>
          <input
            {...register('payment')}
            className="form-control"
            type="number"
            placeholder="Enter the Payment"
            {...register('Payment', {
              required: true,
              pattern: /\d+/,
            })}
          />
          {errors.Payment && (
            <label className="mt-1" style={{ color: 'red' }}>
              Please enter a valid payment amount.
            </label>
          )}
        </div>
      )}

      {/* Submit button*/}
      <input className="btn btn-primary" type="submit" value="Submit" />
    </form>
  )
}
