import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import { saveEmail } from '../redux/actions';
import App from '../App';

const PASSWORD_TEST_ID = 'password-input';
const VALID_EMAIL = 'alguem@alguem.com';
const VALID_PASSWORD = '123456';

describe('Testando a página Login e seus componentes', () => {
  it('Verifica se está na página de Login', () => {
    renderWithRouterAndRedux(<Login />);
    screen.getByRole('heading', { name: /login/i });
  });
  it('Verifica se existem os inputs de Email e Senha, e o botão de Entrar', () => {
    renderWithRouterAndRedux(<Login />);
    screen.getByRole('heading', { name: /login/i });
    screen.getByTestId(PASSWORD_TEST_ID);
    const enterBtn = screen.getByRole('button', { name: /entrar/i });
    expect(enterBtn).toBeInTheDocument();
    expect(enterBtn).toBeDisabled();
  });
  it('Verifica se é possível digitar nos inputs de Email e Senha', () => {
    renderWithRouterAndRedux(<Login />);
    const emailContent = VALID_EMAIL;
    const passwordContent = VALID_PASSWORD;
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    userEvent.type(emailInput, emailContent);
    userEvent.type(passwordInput, passwordContent);
    expect(emailInput).toHaveValue(emailContent);
    expect(passwordInput).toHaveValue(passwordContent);
  });
  it('Verifica a funcionalidade do botão de Entrar', () => {
    renderWithRouterAndRedux(<Login />);
    const invalidEmailContent = 'alguem.com';
    const invalidPassword = '12345';
    const emailContent = VALID_EMAIL;
    const passwordContent = VALID_PASSWORD;
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    userEvent.type(emailInput, invalidEmailContent);
    userEvent.type(passwordInput, invalidPassword);
    const enterBtn = screen.getByRole('button', { name: /entrar/i });
    expect(enterBtn).toBeDisabled();
    userEvent.type(emailInput, emailContent);
    userEvent.type(passwordInput, passwordContent);
    expect(enterBtn).not.toBeDisabled();
  });
  it('Testando se ao clicar no botão de Entrar, a rota é alterada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailContent = VALID_EMAIL;
    const passwordContent = VALID_PASSWORD;
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    userEvent.type(emailInput, emailContent);
    userEvent.type(passwordInput, passwordContent);
    const enterBtn = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(enterBtn);
    act(() => { history.push('/carteira'); });
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
  it('Testando a action e o estado global de user', async () => {
    const email = 'teste@gmail.com';
    const initialState = {
      user: {
        email,
      },
    };
    const initialEntries = ['/carteira'];
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialEntries, initialState },
    );
    store.dispatch(saveEmail('teste@gmail.com'));
    expect(store.getState().user.email).toBe(email);
  });
});
