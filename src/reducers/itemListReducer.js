import {
  DELETE_ITEM,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_REQUEST,
  UPDATE_DATE,
  UPDATE_ITEM,
} from "./../constants/action-types";
import dateFormat from "./../utils/dateFormat";
const initialState = {
  allitems: [],
  loading: false,
  month: dateFormat.toDualDigit(new Date().getMonth() + 1),
  day: dateFormat.toDualDigit(new Date().getDate()),
  recordDate:
    new Date().getFullYear() + "-" + dateFormat.toDualDigit(new Date().getMonth() + 1) + "-" + dateFormat.toDualDigit(new Date().getDate()),
  whichMonth:
    new Date().getFullYear() + "-" + dateFormat.toDualDigit(new Date().getMonth() + 1),
  remainDays:
    dateFormat.days(new Date().getFullYear(), new Date().getMonth() + 1) + 1 - dateFormat.toDualDigit(new Date().getDate()),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DELETE_ITEM:
      return {
        ...state,
        allitems: [
          ...state.allitems.filter((item) => {
            return item.timestamp !== action.timestamp;
          }),
        ],
        loading: true,
      };
    case UPDATE_ITEM:
      state.allitems.forEach((item) => {
         if (item.timestamp === action.timestamp) {
          item.accountClass = action.itemInfo.accountClass
          item.itemClass = action.itemInfo.itemClass
          item.itemValue = action.itemInfo.itemValue
          item.itemContent = action.itemInfo.itemContent
        }}
      );
      return { ...state };
    case FETCH_ITEMS_SUCCESS:
      return { ...state, allitems: action.items, isLoading: false };
    case FETCH_ITEMS_REQUEST:
      return { ...state, isLoading: true };
    case UPDATE_DATE:
      let remainDays = 0
      if(new Date(action.date.replace(/-/g,"/")) <= new Date() && ((new Date(action.date).getMonth() + 1) === (new Date().getMonth() + 1)))
        remainDays = dateFormat.days(new Date(action.date).getFullYear(), new Date(action.date).getMonth() + 1) +
         1 -
         dateFormat.toDualDigit(new Date(action.date).getDate())
        
      return {
        ...state,
        recordDate: action.date,
        month: dateFormat.toDualDigit(new Date(action.date).getMonth() + 1),
        day: dateFormat.toDualDigit(new Date(action.date).getDate()),
        whichMonth:
          new Date(action.date).getFullYear() +
          "-" +
          dateFormat.toDualDigit(new Date(action.date).getMonth() + 1),
        remainDays
      };
    default:
      return state;
  }
}
