export const actionTypes = {
  SAVE_EMAIL: 'SAVE_EMAIL',
  GET_GURRENCIES: 'GET_GURRENCIES',
};

export const saveEmail = (email) => ({
  type: actionTypes.SAVE_EMAIL,
  payload: email,
});

export const getGurrencies = (currencies) => ({
  type: actionTypes.GET_GURRENCIES,
  payload: currencies,
});
