import {
  FETCH_ACCOUNTS,
  FETCH_ACCOUNT_SUCCESS,
  SET_ACCOUNT_BUDGET,
  ADD_NEW_ACCOUNT,
  DELETE_ACCOUNT
} from "../constants/action-types";

export default function (state = [], action) {
  switch (action.type) {
    case SET_ACCOUNT_BUDGET:
      return {...state, monthBudget: action.monthBudget};
    case FETCH_ACCOUNT_SUCCESS:
      return { ...state, monthBudget: action.accountBudget };
    case FETCH_ACCOUNTS:
        return { ...state, accountList: action.accountList };
    case ADD_NEW_ACCOUNT:
        return { ...state, accountList: action.accountList };
    case DELETE_ACCOUNT:
        return { ...state, accountList: action.accountList };
    default:
      return state;
  }
}
