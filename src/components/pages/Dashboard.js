import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: -1
    };
  }

  componentDidMount() {
    this.setState({
      count: this.props.campaigns.length
    });
  }

  render() {
    let action;
    if (this.state.count === 0) {
      action = (
        <div className="action">
          Before you can create notes, you will need to create a campaign. Click
          the button below to create your first campaign.
          <p>
            <button
              className="primary"
              onClick={() => this.props.toggleModal()}
            >
              Create Campaign
            </button>
          </p>
        </div>
      );
    }
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <p>Hey there, {this.props.name}!</p>
        <p>
          Welcome to GM Admin! We're excited to have you here. Eventually we
          will display some useful information here, but for now you can click
          on the items in the navigation on the left to start building your
          campaign.
        </p>
        {action}
      </div>
    );
  }
}
export default Dashboard;
