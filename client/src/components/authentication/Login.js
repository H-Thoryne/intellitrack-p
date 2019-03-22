import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { resetErrors } from '../../actions/errorActions';
import TextFieldGroup from '../common/TextFieldGroup';
import { Redirect } from '@reach/router';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.loginUser({
      email: this.state.email,
      password: this.state.password
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillUnmount = () => {
    this.props.resetErrors();
  };

  render() {
    const { error, auth: { isAuthenticated } } = this.props;
    if(isAuthenticated){
      return <Redirect to="/assets" noThrow />
    }

    return (
      <div className="container p-4 m-auto">
        <h1 className="display-4 text-center mb-4">
          <span style={{ fontWeight: 'bold' }}>Intelli</span>track
        </h1>
        <form
          style={{
            backgroundColor: '#eee',
            maxWidth: '400px',
            borderRadius: '5px',
            boxShadow: '0 0 20px #999'
          }}
          className="text-center m-auto p-4"
          onSubmit={this.onSubmit}
        >
          <p className="lead">Kérjük az oldal használatához jelentkezz be!</p>
          <TextFieldGroup
            type="email"
            name="email"
            error={error.email}
            text={this.state.email}
            onChange={this.onChange}
            placeholder="E-mail cím"
          />
          <TextFieldGroup
            type="password"
            name="password"
            error={error.password}
            text={this.state.password}
            onChange={this.onChange}
            placeholder="Jelszó"
          />
          <button className="btn btn-lg btn-dark btn-block" type="submit">
            Bejelentkezés
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.errors
});

const mapDispatchToProps = {
  loginUser,
  resetErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
