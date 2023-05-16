import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { fetchCurrenciesFromApi, saveExpenses } from '../redux/actions';
import mockData from './helpers/mockData';
import WalletForm from '../components/WalletForm';

const EXPENSE_VALUE = '500';
const EXPENSE_DESC = 'Minha despesa';
const VALID_EMAIL = 'alguem@alguem.com';

describe('Testando a página Wallet e seus componentes', () => {
  it('Testa se está na página Wallet', () => {
    renderWithRouterAndRedux(<Wallet />);
    screen.getByText(/valor da despesa:/i);
    screen.getByText(/descrição da despesa:/i);
  });
  it('Testa se o fetch para o select das moedas está sendo feito ao montar o componente', async () => {
    const currencies = ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'];
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(currencies),
    });
    renderWithRouterAndRedux(<Wallet />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  it('Testa se os inputs e o botão de adicionar despesa estão sendo renderizados', () => {
    renderWithRouterAndRedux(<Wallet />);
    screen.getByRole('textbox', { name: /valor da despesa:/i });
    screen.getByRole('textbox', { name: /descrição da despesa:/i });
    const currencySelect = screen.getByText(/moeda:/i);
    within(currencySelect).getByRole('combobox');
    screen.getByRole('combobox', { name: /tag:/i });
    screen.getByRole('button', { name: /adicionar despesa/i });
  });
  it('Testa se é possível digitar nos inputs', () => {
    renderWithRouterAndRedux(<Wallet />);
    const expenseValue = screen.getByRole('textbox', { name: /valor da despesa:/i });
    const expenseDescription = screen.getByRole('textbox', { name: /descrição da despesa:/i });
    userEvent.type(expenseValue, EXPENSE_VALUE);
    userEvent.type(expenseDescription, EXPENSE_DESC);
    expect(expenseValue).toHaveValue(EXPENSE_VALUE);
    expect(expenseDescription).toHaveValue(EXPENSE_DESC);
  });
  it('Testa se ao adicionar a despesa, ela é adicionada ao estado global', () => {
    const initialState = {
      currencies: [],
      expenses: [],
      editor: false,
      idToEdit: 0,
      expansesTotal: 0,
      currentCurrency: 'BRL',
      isFetching: false,
    };
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const expenseValue = screen.getByRole('textbox', { name: /valor da despesa:/i });
    const expenseDescription = screen.getByRole('textbox', { name: /descrição da despesa:/i });
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(expenseValue, EXPENSE_VALUE);
    userEvent.type(expenseDescription, EXPENSE_DESC);
    userEvent.click(addExpenseBtn);
  });
  it('Ao clicar em adicionar despesa, a função fetchCurrenciesFromApi é chamada', () => {
    renderWithRouterAndRedux(<Wallet />);
    const expenseValue = screen.getByRole('textbox', { name: /valor da despesa:/i });
    const expenseDescription = screen.getByRole('textbox', { name: /descrição da despesa:/i });
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(expenseValue, EXPENSE_VALUE);
    userEvent.type(expenseDescription, EXPENSE_DESC);
    const fetchCurrenciesSpy = jest.spyOn(fetchCurrenciesFromApi);
    userEvent.click(addExpenseBtn);
    expect(fetchCurrenciesSpy).toHaveBeenCalledTimes(1);
  });
  it('Testa se o estado global é atualizado corretamente', () => {
    jest.spyOn(global, 'fetch');
    renderWithRouterAndRedux(<WalletForm />);
    const initialState = {
      user: {
        email: VALID_EMAIL,
      },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
        total: 0,
      },
    };
    const state = {
      id: 0,
      value: '100',
      description: 'teste',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    const initialEntries = ['/carteira'];
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialEntries, initialState },
    );
    store.dispatch(saveExpenses({ ...state, exchangeRates: mockData }));
    expect(store.getState().user.email).toBe('alguem@alguem.com');
    screen.getByRole('heading', { name: /email: alguem@alguem.com/i });
  });
});
