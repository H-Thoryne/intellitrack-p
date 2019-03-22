import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "@reach/router";
import { keepUserLoggedInOnNavigate } from "../../actions/authActions";
import { setNotification } from "../../actions/notificationActions";

class AuthCheck extends Component {
  componentDidMount = () => {
    this.props.keepUserLoggedInOnNavigate();
  };

  componentDidUpdate = () => {
    //Delete Notification if navigate to new location
    this.props.setNotification();
    this.props.keepUserLoggedInOnNavigate();
  };

  componentWillUnmount = () => {
    this.props.setNotification();
  };

  render() {
    return this.props.isAuthenticated ? (
      this.props.children
    ) : (
      <Redirect to="/login" noThrow />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { keepUserLoggedInOnNavigate, setNotification }
)(AuthCheck);
