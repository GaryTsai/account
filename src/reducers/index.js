import { combineReducers } from "redux"; // 1.
import itemListReducer from "./itemListReducer"; // 3.
import accountReducer from "./accountReducer"; // 3.
const rootReducer = combineReducers({
  itemList: itemListReducer,
  accountInfo: accountReducer
});

export default rootReducer;
