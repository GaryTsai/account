import {
  DELETE_ITEM,
  UPDATE_ITEM,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ACCOUNT_SUCCESS,
  SET_ACCOUNT_BUDGET,
  UPDATE_DATE,
  FETCH_ACCOUNTS,
  ADD_NEW_ACCOUNT,
  DELETE_ACCOUNT,
} from "./../constants/action-types";
import firebase from "./../utils/firebaseConfig";
import cookie from "./../utils/cookie"

const account = cookie.getCookie("account");

export const fetchItems = () => {
  let getDataRef = firebase.database().ref(`/expense/${account}`);
  return (dispatch, getState) => {
    dispatch({ type: FETCH_ITEMS_REQUEST, loading: true });
    getDataRef.on("value", (snapshot) => {
      let items = [];
      snapshot.forEach((element) => {
        items.unshift(element.val());
      });
      dispatch({ type: FETCH_ITEMS_SUCCESS, items, isLoading: false });
    });
  };
};

export const fetchAccountBudget = () => {
  let getBudgetRef = firebase.database().ref(`/account/${account}`);
  return (dispatch, getState) => {
    getBudgetRef.on("value", (snapshot) => {
      if (!snapshot.val()) {
        return;
      }
      let accountBudget = snapshot.val().budget;
      dispatch({ type: FETCH_ACCOUNT_SUCCESS, accountBudget });
    });
  };
};

export const addNewItem = (itemInfo) => {
  let postRef = firebase.database().ref(`/expense/${account}`);
  return (dispatch, getState) => {
    postRef
      .child(itemInfo.timestamp.toString())
      .set(itemInfo)
      .then(function () {
        console.log("Post successfully");
      })
      .catch(function (err) {
        console.error("Post Failed：", err);
      });
  };
};

export const deleteItem = (timestamp) => {
  let delRef = firebase.database().ref(`/expense/${account}`);
  return (dispatch, getState) => {
    delRef
      .child(`${timestamp}`)
      .remove()
      .then(function () {
        console.log("Delete successfully");
        dispatch({ type: DELETE_ITEM, timestamp });
      })
      .catch(function (err) {
        console.error("Delete failed：", err);
      });
  };
};

export const setMonthBudget = (monthBudget) => {
  let setBudgetRef = firebase.database().ref(`/account/`);
  return (dispatch, getState) => {
    setBudgetRef
      .child(account)
      .update({ budget: monthBudget })
      .then(function () {
        console.log("Budget set successfully");
        dispatch({ type: SET_ACCOUNT_BUDGET, monthBudget });
      })
      .catch(function (err) {
        console.error("Budget set failed：", err);
      });
  };
};

export const updateDate = (date) => {
  return {
    type: UPDATE_DATE,
    date,
  };
};

export const getAccounts = () => {
  let getAccountCategory = firebase.database().ref(`account/${account}`);
  return (dispatch, getState) => {
    getAccountCategory.on("value", (snapshot) => {
      if (!snapshot.val()) {
        return;
      }
      dispatch({
        type: FETCH_ACCOUNTS,
        accountList: snapshot.val().accountCategory,
      });
    });
  };
};

export const addNewAccount = (accountList, newAccount) => {
  let setAccountCategory = firebase.database().ref(`account/${account}`);
  return (dispatch, getState) => {
    accountList.push(newAccount);
    setAccountCategory.update({ accountCategory: accountList });
    dispatch({ type: ADD_NEW_ACCOUNT, accountList });
  };
};

export const deleteAccount = (accountList) => {
  let setAccountCategory = firebase.database().ref(`account/${account}`);
  return (dispatch, getState) => {
    setAccountCategory.update({ accountCategory: accountList });
    dispatch({ type: DELETE_ACCOUNT, accountList });
  };
};

export const updateItem = (itemInfo, timestamp) => {
  let updateRef = firebase.database().ref(`expense/${account}/${timestamp}`);
  return (dispatch, getState) => {
    updateRef.update({
      accountClass: itemInfo.accountClass,
      itemClass: itemInfo.itemClass,
      itemValue: itemInfo.itemValue,
      itemContent: itemInfo.itemContent,
    });
    dispatch({ type: UPDATE_ITEM, itemInfo, timestamp });
  };
};
