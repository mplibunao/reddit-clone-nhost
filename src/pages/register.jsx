import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { auth } from "utils";
import Link from "next/link";

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
    <div className="container mx-auto">
      <div className="flex flex-col max-w-xl mx-auto shadow px-4 my-12 py-5">
        <div className="text-center uppercase text-gray-700  pb-4">
          Register
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Email"
              autoFocus
              name="email"
              className="border rounded px-4 py-1 my-2"
              {...register("email", { required: true })}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border rounded px-4 py-1 my-2"
              {...register("password", { required: true })}
            />
            <div className="flex justify-center mt-2">
              <button
                type="submit"
                className="bg-indigo-700 text-white uppercase px-4 py-2 text-sm"
              >
                Register
              </button>
            </div>

            <div className="py-6 text-center text-gray-700">
              Already have an account?{" "}
              <Link href="/login">
                <a className="text-indigo-700 hover:underline">Login</a>
              </Link>
              .
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
