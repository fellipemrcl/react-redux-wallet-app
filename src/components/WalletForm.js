import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { fetchApi, fetchCurrenciesFromApi } from '../redux/actions';

class WalletForm extends Component {
  lastId = 0;

  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleAddExpense = async () => {
    const { dispatch } = this.props;
    const { value,
      description, currency, method, tag } = this.state;
    const id = this.lastId;
    await dispatch(fetchCurrenciesFromApi({
      value,
      description,
      currency,
      method,
      tag,
      id }));
    this.lastId += 1;
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
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
              value={ currency }
              name="currency"
              id="currency"
            >
              {currencies
                .map((Eachcurrency, index) => (
                  <option key={ index }>{Eachcurrency}</option>))}
            </select>
          </label>
          <label htmlFor="methodInput">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="methodInput"
              onChange={ this.handleChange }
              value={ method }
              name="method"
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
              value={ tag }
              name="tag"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
        <button
          onClick={ this.handleAddExpense }
        >
          Adicionar despesa
        </button>

      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
};

WalletForm.defaultProps = {
  currencies: [],
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.currentCurrencies,
});

export default connect(mapStateToProps)(WalletForm);
