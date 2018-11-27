import React, { Component } from "react";
import axios from "axios";
import TextField from "../common/TextField";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      setting: "",
      campaigns: [],
      edit: false,
      delete: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidUpdate(prevState) {
    if (prevState.campaigns !== this.props.campaigns) {
      this.setState({
        campaigns: this.props.campaigns
      });
    }
  }

  onEdit() {
    const edit = this.state.edit;
    this.setState({
      edit: !edit
    });
  }

  onDelete(id) {
    axios.delete(`/api/campaigns/${id}`).then(res => {
      let [campaigns, i] = [this.state.campaigns, null];
      campaigns.map((campaign, index) => {
        if (id === campaign._id) {
          i = index;
          return true;
        }
        return false;
      });
      campaigns.splice(i, 1);
      this.setState({
        campaigns,
        delete: false
      });
    });
  }

  onSubmit() {
    const campaign = {
      name: this.state.name,
      setting: this.state.setting
    };
    axios.post("/api/campaigns", campaign).then(res => {
      const campaigns = this.state.campaigns;
      console.log(res);
      campaigns.push(res.data);
      this.setState({
        campaigns
      });
      this.onEdit();
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let content;
    if (this.state.edit) {
      content = (
        <div className="modal-edit">
          <TextField
            type="text"
            name="name"
            placeholder="Campaign Name"
            value={this.state.name}
            onChange={this.onChange}
          />
          <TextField
            type="text"
            name="setting"
            placeholder="Setting"
            value={this.state.setting}
            onChange={this.onChange}
          />
          <button onClick={() => this.onSubmit()}>
            <span className="fa fa-floppy-o" />
          </button>
          <button onClick={() => this.onEdit()}>
            <span className="fa fa-ban" />
          </button>
        </div>
      );
    } else if (this.state.delete) {
      content = (
        <div className="modal-delete">
          <p>Are you sure you want to delete this campaign?</p>
          <small>
            This cannot be undone and you will lose all of your work on it.
          </small>
          <button onClick={() => this.onDelete(this.state.id)}>Delete</button>
        </div>
      );
    } else {
      content = (
        <ul>
          <li onClick={() => this.onEdit()}>
            <span className="fa fa-plus-circle" />
            Add New Item
          </li>
          {this.state.campaigns.map(campaign => (
            <li key={campaign._id}>
              <div onClick={() => this.props.select(campaign.name)}>
                {campaign.name} <span>{campaign.setting}</span>
              </div>
              <div
                onClick={() =>
                  this.setState({ id: campaign._id, delete: true })
                }
              >
                Delete
              </div>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div
        className={this.props.show ? "modal-overlay show" : "modal-overlay"}
        onClick={() => this.props.toggleModal()}
      >
        <div className="modal" onClick={e => e.stopPropagation()}>
          <h5>Campaigns</h5>
          {content}
        </div>
      </div>
    );
  }
}

export default Modal;
