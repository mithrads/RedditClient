import "./App.css";
import React, { useEffect, useReducer } from "react";
import SubRedditNavigation from "./subRedditNavigation/subRedditNavigation";
import SubRedditPosts from "./subRedditNavigation/posts/subRedditPosts";

const initialState = {
  navigationItems: [],
  selectedSubreddit: null,
  postItems: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "set-navigation-items":
      return {
        ...state,
        navigationItems: action.payload,
      };
    case "set-selected-subreddit":
      return {
        ...state,
        selectedSubreddit: action.payload,
        postItems: [],
      };
    case "set-post-items":
      return {
        ...state,
        postItems: action.payload,
      };
    default:
      throw new Error();
  }
}

let postsCallbackName = null;

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const documentHead = document.head;
    if (documentHead == null)
      throw new Error("No <head> to use for script injection.");

    const cbname = `fn${Date.now()}`;
    const script = document.createElement("script");
    script.src = `https://www.reddit.com/reddits.json?jsonp=${cbname}`;
    window[cbname] = (jsonData) => {
      dispatch({
        payload: jsonData.data.children,
        type: "set-navigation-items",
      });
      delete window[cbname];
      documentHead.removeChild(script);
    };

    documentHead.appendChild(script);
  }, []);

  const setSelectedItem = (item) => {
    const documentHead = document.head;
    if (documentHead == null)
      throw new Error("No <head> to use for script injection.");

    const cbname = (postsCallbackName = `fn${Date.now()}`);
    const script = document.createElement("script");
    script.src = `https://www.reddit.com${item.data.url}.json?sort=top&t=month&jsonp=${cbname}`;
    window[cbname] = (jsonData) => {
      if (cbname === postsCallbackName) {
        dispatch({
          payload: jsonData.data.children,
          type: "set-post-items",
        });
      }

      delete window[cbname];
      documentHead.removeChild(script);
    };

    documentHead.appendChild(script);

    dispatch({
      payload: item,
      type: "set-selected-subreddit",
    });
  };

  return (
    <React.Fragment>
      <SubRedditNavigation
        activeUrl={
          state.selectedSubreddit == null
            ? null
            : state.selectedSubreddit.data.url
        }
        items={state.navigationItems}
        itemSelected={setSelectedItem}
      />
      <SubRedditPosts items={state.postItems} />
    </React.Fragment>
  );
}
