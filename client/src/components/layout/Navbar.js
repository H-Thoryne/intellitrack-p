import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { navigate } from "@reach/router";
import NavLink from "../common/NavLink";

const Navbar = ({ auth: { isAuthenticated }, logoutUser }) => {
  const onLogoutClick = () => {
    logoutUser();
    navigate("/login");
  };

  const navLinks = isAuthenticated ? (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard">
          Profil
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/assets">
          Eszközlista
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/locations">
          Helyszínek
        </NavLink>
      </li>
      <li className="nav-item">
        <button className="btn nav-link" onClick={onLogoutClick}>
          Kijelentkezés
        </button>
      </li>
    </ul>
  ) : (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Bejelentkezés
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">
          Regisztráció
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="mb-4 navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <span style={{ fontWeight: "bold" }}>Intelli</span>track
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          {navLinks}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
