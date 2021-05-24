import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { auth } from "utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "components/layout";

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

  const router = useRouter();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...defaultValues });
    }
  }, [reset, isSubmitSuccessful, defaultValues]);

  const onSubmit = async ({ email, password }) => {
    try {
      await auth.register({ email, password });
      alert("Registration succesful");
      await auth.login({ email, password });
      router.push("/");
    } catch (error) {
      alert("register failed");
    }
  };
  return (
    <Layout>
      <div className="flex flex-col max-w-xl mx-auto shadow px-4 my-12 py-5">
        <div className="pb-4 text-center text-gray-700 uppercase">Register</div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Email"
              autoFocus
              name="email"
              className="px-4 py-1 my-2 border rounded"
              {...register("email", { required: true })}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="px-4 py-1 my-2 border rounded"
              {...register("password", { required: true })}
            />
            <div className="flex justify-center mt-2">
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white uppercase bg-indigo-700"
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
    </Layout>
  );
};

export default Register;
