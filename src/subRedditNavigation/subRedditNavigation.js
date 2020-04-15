import "./subRedditNavigation.css";
import React, { useMemo } from "react";
import SubRedditItem from "./subRedditItem";

export default function SubRedditNavigation(props) {
  const sortedItems = useMemo(
    () =>
      props.items.slice().sort(
        (a, b) =>
          // Sort by # of subscribers in descending order
          b.data.subscribers - a.data.subscribers
      ),
    [props.items]
  );
  return (
    <ul className="navigation">
      {sortedItems.map((item) => (
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
