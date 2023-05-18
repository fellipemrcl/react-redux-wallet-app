import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, updateExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { dispatch, expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map(
                ({ currency, description, id, method, tag, value, exchangeRates }) => (
                  <tr key={ id }>
                    <td>{ description }</td>
                    <td>{ tag }</td>
                    <td>{ method }</td>
                    <td>{ Number(value).toFixed(2) }</td>
                    <td>{exchangeRates[currency].name}</td>
                    <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                    <td>{ (exchangeRates[currency].ask * value).toFixed(2) }</td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="edit-btn"
                        onClick={ () => dispatch(updateExpense(id)) }
                      >
                        Editar

                      </button>
                      <button
                        data-testid="delete-btn"
                        onClick={ () => dispatch(deleteExpense(id)) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ),
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
