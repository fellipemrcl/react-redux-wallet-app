import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, currentCurrency, expenses } = this.props;
    const calc = expenses
      .reduce((acumulador, cur) => acumulador
      + parseFloat(cur.exchangeRates[cur.currency].ask) * parseFloat(cur.value), 0);

    return (
      <div>
        <p data-testid="email-field">
          Email:
          {' '}
          {email}
        </p>
        <p>
          Despesa Total: R$
          <span data-testid="total-field">
            {calc.toFixed(2)}
          </span>

        </p>
        <p
          data-testid="header-currency-field"
        >
          {currentCurrency}
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  currentCurrency: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expansesTotal: state.wallet.expansesTotal,
  currentCurrency: state.wallet.currentCurrency,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
