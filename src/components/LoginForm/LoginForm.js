import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Errors, actions } from 'react-redux-form';
import TextField from '../TextField';
import SubmitButton from '../SubmitButton';
import Login from '../../services/Login';

class LoginForm extends Component {
  handleSubmit(credentials) {
    this.props.dispatch(actions.submit('login', this.login(credentials)));
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      Login.authenticate(this.props.apiUrl, credentials.login)
        .then(user => {
          this.props.dispatch(this.props.loginSuccessAction(user));
          resolve(user);
        })
        .catch(error => {
          reject({ '': error.message });
        });
    });
  }

  render() {
    const submitDisabled =
      !this.props.forms.login.username.valid ||
      !this.props.forms.login.password.valid;

    return (
      <Form
        model="login"
        onSubmit={credentials => this.handleSubmit(credentials)}
      >
        <Errors style={{ color: 'red' }} model="login" />

        <TextField
          id="username"
          label="Username"
          model="login.login.username"
          textFieldComponent={this.props.textFieldComponent}
          validators={{
            required: val => val && val.length >= 3,
          }}
        />

        <TextField
          id="password"
          label="Password"
          model="login.login.password"
          textFieldComponent={this.props.textFieldComponent}
          validators={{
            required: val => val && val.length >= 6,
          }}
        />

        <SubmitButton
          buttonClassName={this.props.buttonClassName}
          buttonComponent={this.props.buttonComponent}
          buttonProps={this.props.buttonProps}
          disabled={submitDisabled}
        >
          Log In
        </SubmitButton>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  forms: PropTypes.object,
  loginSuccessAction: PropTypes.func.isRequired,
  TextFieldComponent: PropTypes.element,
  ButtonComponent: PropTypes.element,
};

const mapStateToProps = state => ({
  forms: state.login.forms,
});

export default connect(mapStateToProps)(LoginForm);
