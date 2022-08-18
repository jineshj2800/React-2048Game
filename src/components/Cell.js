import React from "react";

export default function Cell({ value }) {
  return (
    <div className={"cell" + (value ? ` cell-${value}` : "")}>
      {value ? value : null}
    </div>
  );
}
