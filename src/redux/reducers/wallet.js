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
  case actionTypes.SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case actionTypes.DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case actionTypes.UPDATE_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case actionTypes.SAVE_UPDATED_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.idToEdit) return { ...action.payload };
        return expense;
      }),
      editor: false,
      idToEdit: 0,
    };
  default:
    return state;
  }
};

export default wallet;
