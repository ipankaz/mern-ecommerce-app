import React from "react";
import "./style.css";

/**
 * @author
 * @function Card
 **/

const Card = (props) => {
  return (
    <div className="card" {...props}>
      {(props.headerleft || props.headerright) && (
        <div className="cardHeader">
          {props.headerleft && <div>{props.headerleft}</div>}
          {props.headerright && props.headerRrght}
        </div>
      )}

      {props.children}
    </div>
  );
};

export default Card;