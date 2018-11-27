import React, { Component } from "react";
import TextField from "../common/TextField";
import TextArea from "../common/TextArea";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      content: "",
      campaign: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.page._id,
      name: this.props.page.name,
      content: this.props.page.content,
      campaign: this.props.page.campaign
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const pageData = {
      id: this.state.id,
      name: this.state.name,
      content: this.state.content,
      campaign: this.state.campaign
    };
    if (this.state.name !== "" && this.state.content !== "") {
      this.props.onSave(pageData);
    }
  }

  render() {
    return (
      <form className="edit">
        <div className="edit-buttons">
          <button onClick={this.onSubmit}>
            <span className="fa fa-floppy-o" />
          </button>
        </div>
        <TextField
          type="text"
          name="name"
          placeholder="Name"
          error={this.state.errors.name}
          value={this.state.name}
          onChange={this.onChange}
        />
        <TextArea
          name="content"
          placeholder="Content..."
          error={this.state.errors.content}
          value={this.state.content}
          onChange={this.onChange}
        />
      </form>
    );
  }
}
export default Edit;
