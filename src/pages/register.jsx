import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { auth } from "utils";

export const Register = ({ defaultValues = { email: "", password: "" } }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...defaultValues });
    }
  }, [reset, isSubmitSuccessful, defaultValues]);

  const onSubmit = async ({ email, password }) => {
    try {
      await auth.register({ email, password });
      alert("Registration succesful");
    } catch (error) {
      alert("register failed");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Email"
          autoFocus
          name="email"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
