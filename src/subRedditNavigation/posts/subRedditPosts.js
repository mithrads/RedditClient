import "./subRedditPosts.css";
import React from "react";
import SubRedditPostItem from "./subRedditPostItem";

export default class SubRedditPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(e) {
    {
      this.state.id === e.id
        ? this.setState({ id: null })
        : this.setState({ id: e.id });
    }
  }

  handleClickOutside() {
    this.setState({ id: null });
  }

  resetBuilder() {
    this.setState({ id: null });
  }

  render() {
    return (
      <div className="postItem">
        {this.props.items.length > 0 ? (
          <ul>
            {this.props.items.map((item) => (
              <SubRedditPostItem
                item={item}
                itemSelected={(e) => this.togglePanel(item.data)}
                key={item.data.id}
                selectedPostId={this.state.id}
              />
            ))}
          </ul>
        ) : (
          <h2> Click on a Sub Reddit item in the list to preview here </h2>
        )}
      </div>
    );
  }
}
