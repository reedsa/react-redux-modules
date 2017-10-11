import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Errors, actions } from 'react-redux-form';
import TextField from '../TextField';
import SubmitButton from '../SubmitButton';
import Login from '../../services/Login';

class LoginForm extends Component {
  handleSubmit(credentials) {
    this.props.dispatch(
      actions.submit(this.props.model, this.login(credentials))
    );
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      Login.authenticate(this.props.apiUrl, credentials[this.props.model])
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
      !this.props.forms[this.props.model].username.valid ||
      !this.props.forms[this.props.model].password.valid;

    const TextFieldComponent = this.props.textFieldComponent;
    const ButtonComponent = this.props.buttonComponent;

    return (
      <Form
        model={this.props.model}
        onSubmit={credentials => this.handleSubmit(credentials)}
      >
        <Errors style={{ color: 'red' }} model={this.props.model} />

        <TextField
          id="username"
          label="Username"
          model={`.${this.props.model}.username`}
          textFieldComponent={TextFieldComponent}
          validators={{
            required: val => val && val.length >= 3,
          }}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          model={`.${this.props.model}.password`}
          textFieldComponent={TextFieldComponent}
          validators={{
            required: val => val && val.length >= 6,
          }}
        />

        <SubmitButton
          buttonClassName={this.props.buttonClassName}
          buttonComponent={ButtonComponent}
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
  textFieldComponent: PropTypes.func,
  buttonComponent: PropTypes.func,
  model: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  forms: state[props.model].forms,
});

export default connect(mapStateToProps)(LoginForm);
