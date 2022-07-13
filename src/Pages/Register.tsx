import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { toast } from "react-toastify";
import { reset, register as signup } from "../features/auth/authSlice";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { user, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ mode: "onChange" });
  const submitHandler = handleSubmit(({ name, email, password }) => {
    const userData = {
      name,
      email,
      password,
    };
    dispatch(signup(userData));

    navigate("/", {
      replace: true,
    });
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, user, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <section className="text-5xl mb-12 py-0 px-5">
        <h1>Register</h1>
      </section>
      <section className="w-2/3 my-0 mx-auto p-4">
        <form onSubmit={submitHandler}>
          <div className="mb-2.5">
            <input
              type="text"
              placeholder="Enter your Restaurant name"
              className={`w-full p-2 border-solid border border-zinc-300 rounded mb-2.5 ${
                errors.name && "border-red-500"
              }`}
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && (
              <p className="text-red-500">Please enter a valid name</p>
            )}
          </div>
          <div className="mb-2.5">
            <input
              type="text"
              placeholder="Enter your email"
              className={`w-full p-2 border-solid border border-zinc-300 rounded mb-2.5 ${
                errors.email && "border-red-500"
              }`}
              {...register("email", {
                required: "Please enter a valid email address",
                pattern: {
                  value:
                    // eslint-disable-next-line no-useless-escape
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-2.5">
            <input
              type="password"
              placeholder="Enter password"
              className={`w-full p-2 border-solid border border-zinc-300 rounded mb-2.5 ${
                errors.password && "border-red-500"
              } `}
              {...register("password", {
                required: "Please enter a valid password",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
                validate: (value: string) => {
                  return (
                    [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every(
                      (pattern) => pattern.test(value)
                    ) ||
                    "must include lower, upper, number, and special characters"
                  );
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-2.5">
            <input
              type="password"
              placeholder="Confirm password"
              className={`w-full p-2 border-solid border border-zinc-300 rounded mb-2.5 ${
                errors.confirmPassword && "border-red-500"
              }`}
              {...register("confirmPassword", {
                validate: (value: string) => {
                  if (watch("password") !== value) {
                    return "Your passwords do not match";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="mb-2.5">
            <button
              type="submit"
              className="py-2.5 px-5 border border-solid border-black rounded bg-black text-white text-base font-bold text-center cursor-pointer flex items-center justify-center w-full mb-5 hover:scale-98"
            >
              Signup
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
