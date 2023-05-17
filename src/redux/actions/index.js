export const actionTypes = {
  GET_GURRENCIES: 'GET_GURRENCIES',
  SAVE_EMAIL: 'SAVE_EMAIL',
  SAVE_EXPENSES: 'SAVE_EXPENSES',
  REQUEST_STARTED: 'REQUEST_STARTED',
  REQUEST_SUCCESSFUL: 'REQUEST_SUCCESSFUL',
  REQUEST_FAILURE: 'REQUEST_FAILURE',
  FETCH_CURRENCIES: 'FETCH_CURRENCIES',
  DELETE_EXPENSE: 'DELETE_EXPENSE',
};

export const saveEmail = (email) => ({
  type: actionTypes.SAVE_EMAIL,
  payload: email,
});

export const getGurrencies = (currencies) => ({
  type: actionTypes.GET_GURRENCIES,
  payload: currencies,
});

export const saveExpenses = (expense) => ({
  type: actionTypes.SAVE_EXPENSES,
  payload: expense,
});

export const deleteExpense = (id) => ({
  type: actionTypes.DELETE_EXPENSE,
  payload: id,
});

const requestStarted = () => ({ type: actionTypes.REQUEST_STARTED });

const requestFailure = (error) => ({
  type: actionTypes.REQUEST_FAILURE,
  payload: error,
});

export const fetchApi = () => async (dispatch) => {
  try {
    dispatch(requestStarted());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currenciesArray = Object.keys(data);
    currenciesArray.splice(1, 1);
    dispatch(getGurrencies(currenciesArray));
  } catch (error) {
    dispatch(requestFailure(error));
  }
};

export const fetchCurrenciesFromApi = (expense) => async (dispatch) => {
  try {
    dispatch(requestStarted());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(saveExpenses({ ...expense, exchangeRates: data }));
  } catch (error) {
    dispatch(requestFailure(error));
  }
};
