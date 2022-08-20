import React from "react";

/* 
  We prefer arrow functions over regular functions as they
  are compact and concise. For example, we can rewrite Cell
  as an arrow function as follows:

  const Cell = ({ value }) => (
    <div className={"cell" + (value ? ` cell-${value}` : "")}>
      {value ? value : null}
    </div>
  )

  But then you need to export it as default this way:

  export default Cell;
*/
export default function Cell({ value }) {
  return (
    <div className={"cell" + (value ? ` cell-${value}` : "")}>
      {value ? value : null}
    </div>
  );
}
