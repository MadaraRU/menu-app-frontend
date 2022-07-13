import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import Card from "../components/Card";
import MenuForm from "../components/MenuForm";
import { deleteMenu, getMenus } from "../features/menu/menuSlice";
import { reset } from "../features/auth/authSlice";

const Dashboard: React.FC = () => {
  // toggle add category form
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const effectRan = useRef(false);

  const dispatch = useDispatch<AppDispatch>();

  const { categories, isDeleteMenuSuccess } = useSelector(
    (state: RootState) => state.menu
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", {
        replace: true,
      });
    }
    if (effectRan.current === false) {
      dispatch(getMenus());
    }

    if (isDeleteMenuSuccess) {
      dispatch(getMenus());
    }

    return () => {
      dispatch(reset());
      effectRan.current = true;
    };
  }, [user, navigate, dispatch, isDeleteMenuSuccess]);

  const navigateHandler = (e?: any) => {
    const target = e!.target as HTMLInputElement;

    navigate(`${target.dataset.id}`);
  };

  return (
    <>
      <div className="flex justify-end my-4">
        <button
          type="button"
          className="bg-black text-white rounded px-2 py-3 cursor-pointer hover:scale-98"
          onClick={() => {
            setIsTouched(!isTouched);
          }}
        >
          Add category
        </button>
      </div>

      {isTouched && <MenuForm />}

      <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 m gap-5 my-4">
        {categories
          ?.flatMap((cate) => cate.category)
          ?.map((cat) => {
            return (
              <Card
                className="border-solid border rounded-sm px-5 py-4 border-zinc-300 "
                key={cat._id}
                dataId={cat.menuId}
              >
                <button
                  className="text-red-500"
                  onClick={() => {
                    dispatch(deleteMenu(cat.menuId));
                  }}
                >
                  x
                </button>
                <div className="text-xl w-full" data-id={cat.menuId}>
                  {cat.categoryName}
                </div>
                <div
                  data-id={cat.menuId}
                  onClick={navigateHandler}
                  className="underline hover:no-underline cursor-pointer text-cyan-900 "
                >
                  go
                </div>
              </Card>
            );
          })}
      </div>
      {categories?.length === 0 && (
        <p>Get started by adding some category to your Menu</p>
      )}
    </>
  );
};

export default Dashboard;
