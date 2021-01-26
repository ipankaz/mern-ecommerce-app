import React from "react";
import "./style.css";
/**
 * @author
 * @function Card
 **/

const Card = (props) => {
  return (
    <div {...props} className="card">

      <div className="cardHeader">
        {props.headerleft && <div>{props.headerleft}</div>}
        {props.headerright && <div>{props.headerright}</div>}
      </div>

      {props.children}
    </div>
  );
};

export default Card;
