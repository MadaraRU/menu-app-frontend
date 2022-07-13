import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createMenu } from "../features/menu/menuSlice";

interface ICategory {
  categoryName: string;
}

const MenuForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategory>({ mode: "onChange" });

  const submitHandler = handleSubmit((categoryName) => {
    dispatch(createMenu(categoryName));
    reset();
  });

  return (
    <div>
      <form className="flex justify-center" onSubmit={submitHandler}>
        <input
          className={`border border-solid border-zinc-400 rounded w-1/3 py-1 px-1 mx-2 ${
            errors.categoryName && "border-red-500"
          }`}
          type="text"
          placeholder="Enter a category"
          {...register("categoryName", {
            required: "Please enter a category",
            maxLength: {
              value: 15,
              message: "Maximum 15 characters required ",
            },
            minLength: {
              value: 3,
              message: "Minimum 3 characters required",
            },
          })}
        />
        <button
          type="submit"
          className="px-2 rounded border border-black hover:scale-98 focus:border-black"
        >
          Add
        </button>
      </form>
      {errors.categoryName && (
        <p className="text-red-500 ">{errors.categoryName.message}</p>
      )}
    </div>
  );
};

export default MenuForm;
