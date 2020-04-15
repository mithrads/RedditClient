import React from "react";

export default function SubRedditItem(props) {
  return (
    <li
      onClick={() => {
        props.itemSelected(props.item);
      }}
      className={props.selected ? "selected" : ""}
    >
      {props.item.data.display_name}
    </li>
  );
}
