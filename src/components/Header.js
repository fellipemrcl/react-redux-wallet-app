import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expansesTotal, currentCurrency } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          Email:
          {' '}
          {email}
        </p>
        <p data-testid="total-field">
          Despesa Total:
          {' '}
          {expansesTotal}
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
  expansesTotal: PropTypes.number.isRequired,
  currentCurrency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expansesTotal: state.wallet.expansesTotal,
  currentCurrency: state.wallet.currentCurrency,
});

export default connect(mapStateToProps)(Header);
