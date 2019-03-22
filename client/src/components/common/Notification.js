import React, { Component } from "react";
import { connect } from "react-redux";
import { setNotification } from "../../actions/notificationActions";

class Notification extends Component {
  onClose = e => {
    this.props.setNotification();
  };

  render() {
    if (!this.props.notification) return null;
    return (
      <div className="container">
        <div className={`alert alert-${this.props.alertType} alert-dismissible fade show`}>
          {this.props.notification}
          <button type="button" className="close" onClick={this.onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notification: state.notifications.message,
  alertType: state.notifications.alertType
});

export default connect(
  mapStateToProps,
  { setNotification }
)(Notification);
