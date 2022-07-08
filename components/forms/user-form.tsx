import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserType } from "../../lib/models/user-type.enum";
import { EMAIL_REGEX } from "../../lib/utils";

export default function UserForm({
  onUserFormSubmitted,
  initialFormData,
}: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onCreateUser(formData: any) {
    onUserFormSubmitted(formData);
  }

  useEffect(() => {
    reset(initialFormData);
  }, [initialFormData, reset]);

  return (
    <form onSubmit={handleSubmit(onCreateUser)}>
      <label>email</label>
      <input
        type="text"
        {...register("email", {
          required: true,
          pattern: EMAIL_REGEX,
        })}
      />
      {errors.email && (
        <span style={{ color: "red" }}>Email is missing or invalid.</span>
      )}

      <br />
      <label>displayName</label>
      <input
        type="text"
        {...register("displayName", {
          required: true,
          minLength: 3,
        })}
      />
      {errors.displayName && (
        <span style={{ color: "red" }}>Display name if required</span>
      )}

      <br />
      <label htmlFor="cars">User Type: </label>
      <select {...register("userType")}>
        <option value={UserType.Student}>{UserType.Student}</option>
        <option value={UserType.Teacher}>{UserType.Teacher}</option>
        <option value={UserType.Admin}>{UserType.Admin}</option>
      </select>
      {errors.userType && <p>UserType name is required.</p>}

      <br />
      <input className="btn btn-dark" type="submit" value="Submit" />
    </form>
  );
}
