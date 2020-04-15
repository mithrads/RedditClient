import "./subRedditNavigation.css";
import React from "react";
import SubRedditItem from "./subRedditItem";

export default function SubRedditNavigation(props) {
  return (
    <ul className="navigation">
      {props.items.map((item) => (
        <SubRedditItem
          item={item}
          itemSelected={props.itemSelected}
          key={item.data.id}
          selected={item.data.url === props.activeUrl}
        />
      ))}
    </ul>
  );
}
