import React from "react";

const Card = (props: {
  children: React.ReactNode;
  className?: string;
  dataId?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`max-w-sm w-full lg:max-w-full lg:flex justify-center rounded-sm  ${props.className}`}
      onClick={props.onClick}
      data-id={props.dataId}
    >
      {props.children}
    </div>
  );
};

export default Card;
