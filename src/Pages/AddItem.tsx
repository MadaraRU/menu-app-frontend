import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createItem } from "../features/menu/menuSlice";

interface FormData {
  name: string;
  price: number;
  description: string;
  menuId?: string;
}

const AddItem = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });
  const navigate = useNavigate();
  const params = useParams();

  const menuId = params.cat;

  const submitHandler = handleSubmit(({ name, price, description }) => {
    const itemData = {
      name,
      price,
      description,
      menuId,
    };

    dispatch(createItem(itemData));

    navigate(`/${menuId}`, { replace: true });
  });

  return (
    <>
      <div
        className="flex mb-5"
        onClick={() => {
          navigate(-1);
        }}
      >
        <FaArrowLeft className="my-1.5 mx-1" />
        <p className="underline hover:no-underline cursor-pointer">
          Back to Items
        </p>
      </div>

      <section className="text-5xl mb-12 py-0 px-5">
        <h1>Add Item</h1>
      </section>
      <section className="w-2/3 my-0 mx-auto p-4">
        <form onSubmit={submitHandler}>
          <div className="mb-2.5">
            <input
              type="text"
              placeholder="Enter food name"
              className={`w-full p-2 border-solid border border-zinc-300 rounded mb-2.5 ${
                errors.name && "border-red-600"
              }`}
              {...register("name", {
                required: "Please enter a valid name",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters is required",
                },
                maxLength: {
                  value: 15,
                  message: "Maximum 15 characters is required",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-2.5">
            <input
              type="number"
              step="0.1"
              placeholder="Enter food price"
              className={`w-full p-2 border-solid border border-zinc-300 rounded mb-2.5 ${
                errors.price && "border-red-600"
              }`}
              {...register("price", {
                required: "Please enter a valid price",
                min: {
                  value: 0.1,
                  message: "Please enter a valid price",
                },
              })}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="mb-2.5">
            <textarea
              className={`w-full p-2 border-solid border border-zinc-300 rounded mb-2.5 ${
                errors.description && "border-red-600"
              } `}
              placeholder="Enter food description..."
              {...register("description", {
                required: "Please enter a description",
              })}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="mb-2.5">
            <button
              type="submit"
              className="py-2.5 px-5 border border-solid border-black rounded bg-black text-white text-base font-bold text-center cursor-pointer flex items-center justify-center w-full mb-5 hover:scale-98"
            >
              Add
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddItem;
