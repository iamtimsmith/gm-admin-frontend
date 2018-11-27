import React, { Component } from "react";
import autosize from "autosize";

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: 30
    };
  }

  componentDidMount() {
    autosize(this.textarea);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      autosize.update(this.textarea);
    }
  }

  render() {
    return (
      <div>
        <textarea
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          className={this.props.error ? "error" : ""}
          ref={c => (this.textarea = c)}
        />
        <small>{this.props.error}</small>
      </div>
    );
  }
}
export default TextArea;
