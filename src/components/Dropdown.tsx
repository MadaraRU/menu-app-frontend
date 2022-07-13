import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

interface IDropdown {
  userName: string;
  item: string;
  onSignOut: () => void;
}

const Dropdown: React.FC<IDropdown> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler: any = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <div className="relative inline-block text-left">
        <div>
          <button
            onClick={toggleHandler}
            type="button"
            className="flex ml-5"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {props.userName}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              <p
                onClick={props.onSignOut}
                className="flex px-4 py-2 text-sm text-zinc-800 hover:bg-gray-100 cursor-pointer"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                <FaSignOutAlt className="mx-1 my-0.5" />
                {props.item}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
