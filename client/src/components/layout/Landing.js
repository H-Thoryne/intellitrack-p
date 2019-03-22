import React from "react";
import { connect } from "react-redux";
import { Redirect } from "@reach/router";

const Landing = ({ auth: { isAuthenticated } }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" noThrow />;
  }
  
  return (
    <div>
      <h1>Üdvözöllek az Intellitrack oldalán!</h1>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
