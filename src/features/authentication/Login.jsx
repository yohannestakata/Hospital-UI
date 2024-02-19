import { useForm } from "react-hook-form";
import useLogin from "./useLogin";

function Login() {
  const { isLoading, mutate } = useLogin();

  const { handleSubmit, register } = useForm();

  function onSubmit(data) {
    mutate({ username: data.username.trim(), password: data.password });
  }

  return (
    <div className="flex h-screen items-center justify-center bg-black/5 font-primary">
      <div className="w-1/3 rounded-md border-2 border-green-800 bg-white p-4">
        <img src="ahc_logo.png" alt="" className="mx-auto aspect-square w-14" />
        <h1 className="mt-2 text-center">Amede Higher Clinic </h1>
        <h2 className="mt-1 text-center text-xl font-bold">
          Login to dashboard
        </h2>
        <form
          action=""
          className="mt-6 flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="username" className="flex flex-col gap-1">
            <span className="ml-1 text-sm font-bold">Username</span>
            <input
              autoFocus={true}
              {...register("username")}
              id="username"
              type="text"
              className="rounded-md border bg-black/5 px-4 py-2 focus:outline-green-800"
              placeholder="Staff Username"
            />
          </label>
          <label htmlFor="pass" className="flex flex-col gap-1">
            <span className="ml-1 text-sm font-bold">Password</span>
            <input
              {...register("password")}
              id="pass"
              type="password"
              className="rounded-md border bg-black/5 px-4 py-2 focus:outline-green-800"
              placeholder="Password"
            />
          </label>
          <button
            className="rounded-md bg-green-800 py-2 text-green-50 hover:bg-green-900 disabled:bg-black/60"
            disabled={isLoading}
          >
            {isLoading ? "..." : "Login"}
          </button>
        </form>
      </div>

      <div className="absolute bottom-0 right-0 flex flex-col items-center p-3 text-sm opacity-60">
        <span>System by</span>
        <span>0909562997/ 0941219446</span>
      </div>
    </div>
  );
}

export default Login;
