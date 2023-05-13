import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { fetchApi } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    selectValue: 'USD',
    paymentMethod: 'Dinheiro',
    expenseTag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { value, description, selectValue, paymentMethod, expenseTag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="valueInput">
            Valor da despesa:
            <input
              type="text"
              data-testid="value-input"
              value={ value }
              name="value"
              id="valueInput"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descriptionInput">
            Descrição da despesa:
            <input
              type="text"
              data-testid="description-input"
              value={ description }
              name="description"
              id="descriptionInput"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="selectValueInput">
            Moeda:
            <select
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ selectValue }
              name="selectValue"
              id="selectValueInput"
            >
              {currencies
                .map((currency, index) => <option key={ index }>{currency}</option>)}
            </select>
          </label>
          <label htmlFor="methodInput">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="methodInput"
              onChange={ this.handleChange }
              value={ paymentMethod }
              name="paymentMethod"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="expenseTagInput">
            Tag:
            <select
              data-testid="tag-input"
              id="expenseTagInput"
              onChange={ this.handleChange }
              value={ expenseTag }
              name="expenseTag"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  dispatch: PropTypes.func.isRequired,
};

WalletForm.defaultProps = {
  currencies: [],
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
