import React, { FC } from "react";
import "./Card.css";

interface ICard {
  children: JSX.Element;
}

const Card: FC<ICard> = ({ children }) => {
  return (
    <div className="card_container">
      <div className="card_innercontainer">{children}</div>
    </div>
  );
};

export default Card;
