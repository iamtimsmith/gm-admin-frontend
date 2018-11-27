import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

class Display extends Component {
  render() {
    let edit;
    if (Object.keys(this.props.page).length > 0) {
      edit = (
        <div>
          <div className="display-buttons">
            <button onClick={() => this.props.onEdit(this.props.page)}>
              <span className="fa fa-pencil" />
            </button>
            <button onClick={() => this.props.onDelete(this.props.page._id)}>
              <span className="fa fa-trash" />
            </button>
          </div>
          <h1>{this.props.page.name}</h1>
        </div>
      );
    } else {
      edit = "";
    }
    return (
      <div className="display">
        {edit}
        <div className="content">
          <ReactMarkdown source={this.props.page.content} />
        </div>
      </div>
    );
  }
}

export default Display;
