import React, { useEffect, useState } from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { logout, reset } from "../features/auth/authSlice";
import Dropdown from "./Dropdown";

const Header: React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="flex max-w-5xl justify-between items-center mb-14 px-0 py-5 border-b m-auto">
      <div>
        <p className="text-xl">Menu</p>
      </div>
      <ul className="flex items-center justify-between">
        {user ? (
          <>
            <Dropdown
              userName={user && user.name}
              item="Logout"
              onSignOut={onLogout}
            />
          </>
        ) : (
          <>
            <li className="ml-5">
              <Link className="flex items-center" to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li className="ml-5">
              <Link className="flex items-center" to="/register">
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
