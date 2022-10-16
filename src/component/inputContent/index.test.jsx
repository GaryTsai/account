import { render, screen, fireEvent } from '@testing-library/react';
import InputContent from "./index"
import React from 'react';
import configureStore from 'redux-mock-store' 
import thunk from 'redux-thunk'

import { Provider } from 'react-redux'
import {
    setMonthBudget,
    fetchAccountBudget,
    addNewItem,
    updateDate,
    getAccounts,
    addNewAccount,
    deleteAccount,
  } from "../../actions";
const middlewares = [thunk]
const mockStore = configureStore(middlewares)
test('should send the expense record', async () => {
    const initialState = {
        itemList:{
            allitems: []
        },
        accountInfo:{
            monthBudget: 13500
        }
    }
    const store = mockStore(initialState)
    const { content } = render(<Provider store={store} ><InputContent fetchAccountBudget={fetchAccountBudget}/></Provider>);
    const button = screen.getByText(/儲存/i);
    // 3. 對該元素進行操作和互動
    fireEvent.click(button);

    // 4. 檢視結果是否和預期相符
    const listLI = await screen.findAllByText(/備註:/)

    expect(listLI).toHaveLength(1);
});
