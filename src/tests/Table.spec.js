import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import { fetchCurrenciesFromApi, saveExpenses } from '../redux/actions';
// import mockData from './helpers/mockData';
// import WalletForm from '../components/WalletForm';
// import Table from '../components/Table';

const EXPENSE_VALUE = '100';
const EXPENSE_DESC = 'Despesa de teste';

describe('Testando o componente Table da página Wallet', () => {
  renderWithRouterAndRedux(<Wallet />);
  it('Testa se o valor inicial da despesa total inicia zerado', () => {
    screen.getByText(/despesa total: r\$/i);
    screen.getByText(/0\.00/i);
  });
  it('Testa se a tabela é renderizada corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);
    screen.getByRole('columnheader', { name: /descrição/i });
    screen.getByRole('columnheader', { name: /tag/i });
    screen.getByRole('columnheader', { name: /método de pagamento/i });
  });
  it('Testa a adição de uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const expenseValueInput = screen.getByRole('textbox', { name: /valor da despesa:/i });
    const expenseDescInput = screen.getByRole('textbox', { name: /descrição da despesa:/i });
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    act(() => userEvent.type(expenseValueInput, EXPENSE_VALUE));
    act(() => userEvent.type(expenseDescInput, EXPENSE_DESC));
    act(() => userEvent.click(addExpenseBtn));
    await screen.findByRole('cell', { name: /despesa de teste/i });
  });
  it('Testa a remoção de uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const expenseValueInput = screen.getByRole('textbox', { name: /valor da despesa:/i });
    const expenseDescInput = screen.getByRole('textbox', { name: /descrição da despesa:/i });
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    act(() => userEvent.type(expenseValueInput, EXPENSE_VALUE));
    act(() => userEvent.type(expenseDescInput, EXPENSE_DESC));
    act(() => userEvent.click(addExpenseBtn));
    const expenseContent = await screen.findByRole('cell', { name: /despesa de teste/i });
    expect(expenseContent).toBeInTheDocument();
    const editBtn = await screen.findByRole('button', { name: /editar/i });
    const deleteBtn = await screen.findByRole('button', { name: /excluir/i });
    expect(editBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    act(() => userEvent.click(deleteBtn));
    expect(expenseContent).not.toBeInTheDocument();
  });
  it('Testa a edição de uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const expenseValueInput = await screen.findByRole('textbox', { name: /valor da despesa:/i });
    const expenseDescInput = await screen.findByRole('textbox', { name: /descrição da despesa:/i });
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    act(() => userEvent.type(expenseValueInput, EXPENSE_VALUE));
    act(() => userEvent.type(expenseDescInput, EXPENSE_DESC));
    act(() => userEvent.click(addExpenseBtn));
    const editBtn = await screen.findByRole('button', { name: /editar/i });
    act(() => userEvent.click(editBtn));
    expect(expenseValueInput).toHaveValue(EXPENSE_VALUE);
    expect(expenseDescInput).toHaveValue(EXPENSE_DESC);
    act(() => userEvent.type(expenseValueInput, '500'));
    act(() => userEvent.type(expenseDescInput, 'Testando a edição'));
    const editExpenseBtn = await screen.findByRole('button', { name: /editar despesas/i });
    expect(editExpenseBtn).toBeInTheDocument();
    act(() => userEvent.click(editExpenseBtn));
    const updatedExpenseValue = await screen.findByRole('cell', { name: /500\.00/i });
    const updatedExpenseDesc = await screen.findByRole('cell', { name: /testando a edição/i });
    expect(updatedExpenseValue).toBeInTheDocument();
    expect(updatedExpenseDesc).toBeInTheDocument();
  });
});
