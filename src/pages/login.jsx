import { useForm } from "react-hook-form";
import { auth } from "utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { Layout } from "components/layout";

export const Login = ({ defaultValues = { email: "", password: "" } }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await auth.login({ email, password });
      alert("Login succesful");
      router.push("/");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col max-w-xl mx-auto shadow px-4 my-12 py-5">
        <div className="pb-4 text-center text-gray-700 uppercase">Login</div>

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
                Login
              </button>
            </div>

            <div className="py-6 text-center text-gray-700">
              Don't have an account?{" "}
              <Link href="/register">
                <a className="text-indigo-700 hover:underline">Register</a>
              </Link>
              .
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
