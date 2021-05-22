import { useForm } from "react-hook-form";
import { auth } from "utils";
import { useRouter } from "next/router";
import Link from "next/link";

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
    <div className="container mx-auto">
      <div className="flex flex-col max-w-xl mx-auto shadow px-4 my-12 py-5">
        <div className="text-center uppercase text-gray-700  pb-4">Login</div>

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
                Login
              </button>
            </div>

            <div className="py-6 text-gray-700 text-center">
              Don't have an account?{" "}
              <Link href="/register">
                <a className="text-indigo-700 hover:underline">Register</a>
              </Link>
              .
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
