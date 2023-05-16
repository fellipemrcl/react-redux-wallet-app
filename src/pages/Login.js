import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const minPassLeng = 6;
    const isPasswordValid = password.length >= minPassLeng;
    const isEmailValid = this.validateEmail(email);
    return (
      <div>
        <h1>Login</h1>
        <label htmlFor="emailInput">
          Email:
          <input
            type="email"
            id="emailInput"
            data-testid="email-input"
            onChange={ this.handleChange }
            name="email"
            value={ email }
          />
        </label>
        <label htmlFor="passwordInput">
          Senha:
          <input
            type="password"
            id="passwordInput "
            data-testid="password-input"
            name="password"
            onChange={ this.handleChange }
            value={ password }
          />
        </label>
        <button
          type="button"
          disabled={ !isPasswordValid || !isEmailValid }
          onClick={ this.handleClick }
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
