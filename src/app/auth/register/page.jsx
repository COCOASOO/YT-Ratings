"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password != data.confirmPassword) {
      return alert("Passwords do not match");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (res.ok) {
      router.push('/auth/login')
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>
        <label htmlFor="username" className="text-slate-500 mb-2 block">
          Username:
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="username"
        />

        {errors.username ? (
          <span className="text-red-500">{errors.username.message}</span>
        ) : (
          ""
        )}

        <label htmlFor="username" className="text-slate-500 mb-2 block">
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="user@gmail.com"
        />
        {errors.email ? (
          <span className="text-red-500">{errors.email.message}</span>
        ) : (
          ""
        )}

        <label htmlFor="username" className="text-slate-500 mb-2 block">
          Password:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="**********"
        />
        {errors.password ? (
          <span className="text-red-500">{errors.password.message}</span>
        ) : (
          ""
        )}

        <label htmlFor="username" className="text-slate-500 mb-2 block">
          Confirm Password:
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm password is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="**********"
        />

        {errors.confirmPassword ? (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        ) : (
          ""
        )}

        <button className="w-full bg-blue-500 p-3 rounded-lg text-white mt-2">
          Register
        </button>
      </form>
    </div>
  );
}
