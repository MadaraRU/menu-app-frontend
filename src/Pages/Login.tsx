import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { user, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const submitHandler = handleSubmit((data) => {
    dispatch(login(data));
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <section className="text-5xl mb-12 py-0 px-5">
        <h1>Login</h1>
      </section>
      <section className="w-2/3 my-0 mx-auto p-4">
        <form onSubmit={submitHandler}>
          <div className="mb-2.5">
            <input
              className={`w-full p-2 border-solid border border-zinc-300 rounded mb-2.5 ${
                errors.email && "border-red-500"
              }`}
              type="text"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && (
              <p className="text-red-500">Please enter a valid email address</p>
            )}
          </div>
          <div className="mb-2.5">
            <input
              className={`w-full p-2 border-solid border border-zinc-300 rounded mb-2.5  ${
                errors.password && "border-red-500"
              } `}
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <p className="text-red-500">Please enter a valid password</p>
            )}
          </div>
          <div className="mb-2.5">
            <button
              type="submit"
              className="py-2.5 px-5 border border-solid border-black rounded bg-black text-white text-base font-bold text-center cursor-pointer flex items-center justify-center w-full mb-5 hover:scale-98"
            >
              Login
            </button>
          </div>
        </form>
        <p className="">
          Don't have an account yet?{" "}
          <Link
            to="/register"
            className="text-zinc-600 underline hover:no-underline"
          >
            Signup
          </Link>{" "}
        </p>
      </section>
    </>
  );
};

export default Login;
