import React, { Component } from "react";
import axios from "axios";

// Component
import List from "./List";
import Display from "./Display";
import Edit from "./Edit";

class Notebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      page: {},
      edit: false,
      message: ""
    };
    this.onPageChange = this.onPageChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    const data = {
      campaign: this.props.campaign
    };
    axios.post(`/api/${this.props.section}/campaign`, data).then(res => {
      this.setState({
        items: res.data
      });
    });
  }

  onPageChange(page) {
    this.setState({
      page: page,
      edit: false
    });
  }

  onSave(pageInfo) {
    let [exists, i, items] = [false, null, this.state.items];
    const section = this.props.section.toLowerCase();

    // See if page already exists in this.state.pages
    this.state.items.map((page, index) => {
      if (page._id === pageInfo.id) {
        exists = true;
        i = index;
        return true;
      }
      return false;
    });

    axios.post(`/api/${section}/`, pageInfo).then(res => {
      const sect = section.substring(0, section.length - 1);
      if (exists) {
        this.setState({
          success: `Your ${sect} was successfully updated`
        });
      } else {
        this.setState({
          success: `Your ${sect} was successfully created`
        });
      }
    });

    // if page exists, update
    if (exists) {
      items[i].name = pageInfo.name;
      items[i].content = pageInfo.content;
    } else {
      items.push(pageInfo);
    }

    this.setState({
      items,
      edit: false,
      page: {}
    });
  }

  onEdit(page) {
    if (page) {
      this.setState({
        edit: true,
        page
      });
    } else {
      this.setState({
        edit: true
      });
    }
  }

  onDelete(id) {
    // update state
    let [exists, i, pages] = [false, null, this.state.items];
    const section = this.props.section.toLowerCase();
    // Makge sure page exists
    pages.map((page, index) => {
      if (page._id === id) {
        exists = true;
        i = index;
        return true;
      }
      return false;
    });

    //If page exists
    if (exists) {
      pages.splice(i, 1);
      this.setState({
        items: pages,
        page: {}
      });
      axios.delete(`/api/${section}/${id}`);
    }
  }

  render() {
    let show;
    this.state.edit
      ? (show = <Edit page={this.state.page} onSave={this.onSave} />)
      : (show = (
          <Display
            page={this.state.page}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
          />
        ));
    return (
      <div className="notebook">
        <List
          campaign={this.props.campaign}
          section={this.props.section}
          items={this.state.items}
          onPageChange={this.onPageChange}
          onEdit={this.onEdit}
          toggleModal={this.props.toggleModal}
        />
        {show}
      </div>
    );
  }
}
export default Notebook;
