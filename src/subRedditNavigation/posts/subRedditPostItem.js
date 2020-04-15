import React from "react";

export default function SubRedditPost(props) {
  return (
    <div>
      <p
        onClick={() => {
          props.itemSelected(props.item);
        }}
        className={
          props.selectedPostId === props.item.data.id ? "postSelected" : "title"
        }
      >
        {props.item.data.title}
      </p>
      {props.selectedPostId === props.item.data.id ? (
        <div className="card">
          <img
            className="cardImage"
            src={props.item.data.thumbnail}
            alt=""
          ></img>
          <p className="cardTitle">{props.item.data.title}</p>
          <p className="author">Posted By: {props.item.data.author_fullname}</p>
          <p className="description">{props.item.data.selftext}</p>
          <table>
            <thead>
              <tr>
                <th>Score</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.item.data.score}</td>
                <td>{props.item.data.num_comments}</td>
              </tr>
            </tbody>
          </table>
            <a href={props.item.data.url}>Read More</a>
        </div>
      ) : null}
    </div>
  );
}
