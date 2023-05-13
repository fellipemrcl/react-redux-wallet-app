export const actionTypes = {
  SAVE_EMAIL: 'SAVE_EMAIL',
  GET_GURRENCIES: 'GET_GURRENCIES',
  REQUEST_STARTED: 'REQUEST_STARTED',
  REQUEST_SUCCESSFUL: 'REQUEST_SUCCESSFUL',
  REQUEST_FAILURE: 'REQUEST_FAILURE',
};

export const saveEmail = (email) => ({
  type: actionTypes.SAVE_EMAIL,
  payload: email,
});

export const getGurrencies = (currencies) => ({
  type: actionTypes.GET_GURRENCIES,
  payload: currencies,
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
