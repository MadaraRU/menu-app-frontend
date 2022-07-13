import React, { useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { getMenuById, reset, updateItem } from "../features/menu/menuSlice";

interface FormData {
  name: string;
  price: number;
  description: string;
  menuId?: string;
}

const UpdateItem = () => {
  const navigate = useNavigate();
  const params = useParams();

  const menuId = params.cat;
  const itemId = params.id;
  const dispatch = useDispatch<AppDispatch>();
  const { category, isItemSuccess } = useSelector(
    (state: RootState) => state.menu
  );
  const effectRan = useRef(false);

  const { items } = isItemSuccess && category?.category[0]!;

  const activeItem = items?.find((i: any) => i._id === itemId);

  console.log(activeItem);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const submitHandler = handleSubmit(({ name, price, description }) => {
    dispatch(
      updateItem({
        updatedPrice: price ? price : activeItem?.price,
        updatedDescription: description ? description : activeItem?.description,
        updatedName: name ? name : activeItem?.name,
        itemId,
        menuId,
      })
    );

    navigate(`/${menuId}`, { replace: true });
  });

  useEffect(() => {
    if (effectRan.current === false) {
      dispatch(getMenuById(params.cat!));
    }

    return () => {
      effectRan.current = true;
      reset();
    };
  }, [dispatch, params.cat]);

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
        <h1>Update Item</h1>
      </section>
      <section className="w-2/3 my-0 mx-auto p-4">
        <form onSubmit={submitHandler}>
          <div className="mb-2.5">
            <input
              type="text"
              placeholder="Enter food name"
              className={`w-full p-2 border-solid border border-zinc-300 rounded mb-2.5 `}
              {...register("name")}
            />
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
              className={`w-full p-2 border-solid border border-zinc-300 rounded mb-2.5 `}
              placeholder="Enter food description..."
              {...register("description")}
            />
          </div>
          <div className="mb-2.5">
            <button
              type="submit"
              className="py-2.5 px-5 border border-solid border-black rounded bg-black text-white text-base font-bold text-center cursor-pointer flex items-center justify-center w-full mb-5 hover:scale-98"
            >
              Update
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default UpdateItem;
