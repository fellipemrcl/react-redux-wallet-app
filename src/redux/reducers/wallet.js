import { actionTypes } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  expansesTotal: 0,
  currentCurrency: 'BRL',
  isFetching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionTypes.REQUEST_STARTED:
    return {
      ...state,
      isFetching: true,
    };
  case actionTypes.GET_GURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
