import React, { useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import Card from "../components/Card";
import { deleteItem, getMenuById, reset } from "../features/menu/menuSlice";
import FoodItem from "../components/FoodItem";

const FoodItems = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const itemId = useRef("");

  const effectRan = useRef(false);
  const {
    category,
    isItemSuccess,
    isItemLoading,
    isCategorySuccess,
    isDeleteSuccess,
  } = useSelector((state: RootState) => state.menu);

  const { categoryName } = isItemSuccess && category?.category[0];
  const { items } = isItemSuccess && category?.category[0]!;

  const menuId = params.cat;

  useEffect(() => {
    if (effectRan.current === false) {
      dispatch(getMenuById(params.cat!));
    }

    if (isCategorySuccess) {
      dispatch(getMenuById(params.cat!));
    }

    if (isDeleteSuccess) {
      dispatch(getMenuById(params.cat!));
    }

    return () => {
      effectRan.current = true;
      reset();
    };
  }, [dispatch, params.cat, isCategorySuccess, isDeleteSuccess]);

  const deleteHandler = () => {
    const itemData = {
      menuId: menuId as string,
      itemId: itemId.current as string,
    };

    dispatch(deleteItem(itemData));
  };

  return (
    <>
      <div
        className="flex mb-5"
        onClick={() => {
          navigate("/");
        }}
      >
        <FaArrowLeft className="my-1.5 mx-1" />
        <p className="underline hover:no-underline cursor-pointer">
          Back to categories
        </p>
      </div>
      <div className="text-4xl">{!isItemLoading && categoryName}</div>
      {items?.length !== 0 && (
        <div
          className="flex justify-end mb-5"
          onClick={() => {
            navigate(`${location.pathname}/add`);
          }}
        >
          <p className="underline hover:no-underline cursor-pointer">
            Add Item
          </p>
          <FaArrowRight className="my-1.5 mx-1" />
        </div>
      )}
      <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 m gap-5 my-4 ">
        {!isItemLoading &&
          items?.map((i: any) => {
            return (
              <Card
                className="border-solid border rounded-sm border-zinc-300 px-5 py-4"
                key={i._id}
              >
                <button
                  className="text-red-500"
                  onClick={() => {
                    itemId.current = i._id;
                    deleteHandler();
                  }}
                >
                  x
                </button>
                <FoodItem
                  className="w-full"
                  name={i.name}
                  price={i.price}
                  description={i.description}
                />
                <button
                  className="text-indigo-500 underline hover:no-underline"
                  onClick={() => {
                    navigate(`${location.pathname}/update/${i._id}`);
                  }}
                >
                  edit
                </button>
              </Card>
            );
          })}
      </div>
      {isItemLoading && <p>Loading...</p>}
      {!isItemLoading && items?.length === 0 && (
        <p>
          You dont have items yet,{" "}
          <Link
            to={`${location.pathname}/add`}
            className="underline hover:no-underline"
          >
            Add some
          </Link>
        </p>
      )}
    </>
  );
};

export default FoodItems;
