import React from "react";

interface IFoodItem {
  name: string;
  price: number;
  description: string;
  className?: string;
}

const FoodItem = (props: IFoodItem) => {
  return (
    <section className={`${props.className}`}>
      <div className="text-2xl">
        <h2>{props.name}</h2>
      </div>
      <div className="text-lg">
        <p>{props.price} TND</p>
      </div>
      <div className="px-1 font-light">
        <p>{props.description}</p>
      </div>
    </section>
  );
};

export default FoodItem;
