import "./subRedditPosts.css";
import React, { useMemo } from 'react';
import SubRedditPostItem from "./subRedditPostItem";

export default class SubRedditPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      searchValue: null,
      items: props.items
    };
    this.counter = 0;
    this.togglePanel = this.togglePanel.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  togglePanel(e) {
    {
        if(this.state.id === e.id) {
          return this.setState({ id: null})
        }
        else{
          this.counter++;
          return this.setState({ id: e.id });
        }
    }
  }

  handleClickOutside() {
    this.setState({ id: null });
  }

  resetBuilder() {
    this.setState({ id: null });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.items !== nextProps.items) {
      this.counter = 0;
    }
    this.setState({items: nextProps.items});
  }

  handleOnChange(event) {
    if(event.target.value){
      this.setState({ searchValue: event.target.value });
      // let buf = this.state.items;
      // this.setState({items: buf.filter(x => x.data.title.includes(event.target.value))});
    }
  }

  useEffect = (() => {
    const results = this.state.items.filter(x =>
      x.data.title.toLowerCase().includes(this.state.searchValue)
    );
    setSearchResults(results);
  }, [this.state.searchValue]);

  render() {
    return (
      <div id="postItem">
        {this.state.items.length > 0 ? (
          <div>
          <input type="text" 
          placeholder="Search.." 
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}></input>
          {this.counter > 0 ? <h2>You Read: {this.counter} {this.counter > 1 ? "posts" : "post"} !!</h2> : ""}
          <ul>
            {this.state.items.sort((a, b) => b.data.score - a.data.score).map((item) => (
              <SubRedditPostItem
                item={item}
                itemSelected={(e) => this.togglePanel(item.data)}
                key={item.data.id}
                selectedPostId={this.state.id}
              />
            ))}
          </ul>
          </div>
        ) : (
          <h2> Click on a Sub Reddit item in the list to preview here </h2>
        )}
        <button className="scrollButton" onClick={(e) => this.props.scrollToTop(true)}>BACK TO TOP</button>
      </div>
    );
  }
}
