import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles";
import _isUndefined from "lodash/isUndefined";
import eventEmitter from "../../../eventTracking/eventEmitter";
import CategoryTable from "../categoryTable";
import AccountTable from "../accountTable";
import {
  deleteItem,
  addNewAccount,
  deleteAccount,
  updateItem,
} from "../../../actions";

const initialState = {
  isEdit: "",
  editCategory: "",
  editValue: "",
  editContent: "",
  editAccount: "",
  accountList: [],
  inputCategory: "",
  isOpenCategoryTable: false,
  isOpenAccountTable: false,
};

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  itemDelete = (timestamp) => {
    this.props.deleteItem(timestamp);
  };

  isEdit = (idx) => {
    let initialIsEdit = [];
    let category = [];
    let content = [];
    let value = [];
    let account = [];
    this.props.todayItems.forEach((item, idx) => {
      initialIsEdit[idx] = false;
      account[idx] = item.accountClass;
      category[idx] = item.itemClass;
      content[idx] = item.itemValue;
      value[idx] = item.itemContent;
    });
    this.setState(
      {
        theItems: this.props.todayItems,
        isEdit: initialIsEdit,
        editAccount: account,
        editCategory: category,
        editValue: content,
        editContent: value,
      },
      () => this.edit(idx)
    );
  };

  edit = (idx) => {
    const { isEdit } = this.state;
    isEdit[idx] = !isEdit[idx];
    this.setState({ isEdit: isEdit });
  };

  editFinish = (timestamp, idx) => {
    const { editCategory, editValue, editContent, editAccount } = this.state;
    const { dateTime } = this.props;
    editContent[idx] = _isUndefined(editContent[idx]) ? "" : editContent[idx];
    const itemInfo = {
      accountClass: editAccount[idx],
      itemClass: editCategory[idx],
      itemValue: editValue[idx],
      itemContent: editContent[idx],
    };
    this.props.updateItem(itemInfo, timestamp);
    eventEmitter.dispatch("itemEdit", dateTime.toString());
    this.edit(idx);
  };
  editCategory = (category, idx) => {
    const { editCategory } = this.state;
    editCategory[idx] = category;
    this.setState({ editCategory: editCategory, isOpenCategoryTable: false });
  };
  editValue = (value, idx) => {
    const { editValue } = this.state;
    editValue[idx] = value;
    this.setState({ editValue: editValue });
  };
  editContent = (content, idx) => {
    const { editContent } = this.state;
    editContent[idx] = content;
    this.setState({ editContent: editContent });
  };

  editAccount = (account, idx) => {
    const { editAccount } = this.state;
    editAccount[idx] = account;
    this.setState({ editAccount: editAccount, isOpenAccountTable: false });
  };

  closeCategoryList = () => this.setState({ isOpenCategoryTable: false });

  closeAccountList = () => this.setState({ isOpenAccountTable: false });

  openCategoryList = () => {
    if (this.state.isOpenAccountTable) return;
    this.setState({ isOpenCategoryTable: true });
  };

  openAccountList = () => {
    if (this.state.isOpenCategoryTable) return;
    this.setState({ isOpenAccountTable: true });
  };

  render() {
    const {
      isEdit,
      editCategory,
      editValue,
      editContent,
      editAccount,
      isOpenCategoryTable,
      isOpenAccountTable,
    } = this.state;
    const { todayItems, accountList, addNewAccount } = this.props;
    return (
      <div style={{ ...styles.items, textAlign: "left", height: window.innerWidth > 500 ? "calc(100vh - 295px)" : "unset" }}>
        {todayItems &&
          todayItems.map((c, idx) => (
            <div key={"itemShow" + idx}>
              {!isEdit[idx] && (
                <li
                  style={{ ...styles.item, listStyleType: "none" }}
                  key={"item" + idx}
                >
                  <span>{c.itemClass} </span>
                  <span>
                    {c.itemValue}$NT
                    <p style={styles.account}>{c.accountClass}</p>
                  </span>
                  <span>備註:{c.itemContent}</span>
                  <span>
                    <styles.EditIcon
                      onClick={() => this.isEdit(idx)}
                      key={"content-edit" + idx}
                      alt="cost of item"
                      src={require("../../../assets/img/item-edit.png")}
                    />
                  </span>
                  <span>
                    <styles.DeleteIcon
                      onClick={this.itemDelete.bind(this, c.timestamp)}
                      key={"content-delete" + idx}
                      alt="cost of item"
                      src={require("../../../assets/img/item-delete.png")}
                    />
                  </span>
                </li>
              )}
              {isEdit[idx] && (
                <div
                  key={"category" + idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  <li
                    style={{
                      ...styles.item,
                      padding:
                        isOpenCategoryTable || isOpenAccountTable
                          ? "0%"
                          : "0% 1%",
                      listStyleType: "none",
                    }}
                    key={"editItem" + idx}
                  >
                    <label style={styles.editTitle}>帳戶: </label>
                    <div
                      style={{
                        ...styles.styleOfSelectCategory,
                        border: "2px solid #ffbf00",
                        width: "30%",
                      }}
                      onClick={() => this.openAccountList()}
                    >
                      {editAccount[idx]}
                    </div>
                    {isOpenAccountTable && (
                      <AccountTable
                        accountList={accountList}
                        addNewAccount={addNewAccount}
                        deleteAccount={deleteAccount}
                        idx={idx}
                        closeCallback={() => this.closeAccountList()}
                        selectCallback={this.editAccount}
                      />
                    )}
                    <label style={styles.editTitle}>類別: </label>
                    <div
                      style={{ ...styles.styleOfSelectCategory, width: "30%" }}
                      onClick={() => this.openCategoryList()}
                    >
                      {editCategory[idx]}
                    </div>
                    {isOpenCategoryTable && (
                      <CategoryTable
                        closeCallback={() => this.closeCategoryList()}
                        idx={idx}
                        selectCallback={this.editCategory}
                      />
                    )}
                    <label style={styles.editTitle}>費用: </label>
                    <input
                      type="text"
                      style={styles.inputFrame}
                      value={editValue[idx]}
                      ref={(value) => {
                        this.value = value;
                      }}
                      onChange={(c) => this.editValue(c.target.value, idx)}
                      input-mode="numeric"
                    />
                    <label style={styles.editTitle}>備註: </label>
                    <input
                      type="text"
                      style={styles.inputFrame}
                      value={editContent[idx]}
                      ref={(content) => {
                        this.content = content;
                      }}
                      onChange={(c) => this.editContent(c.target.value, idx)}
                    />
                    <styles.EditFinish
                      type="submit"
                      id="item-submit"
                      key={"edit-item-submit" + idx}
                      onClick={() => this.editFinish(c.timestamp, idx)}
                    >
                      完成
                    </styles.EditFinish>
                  </li>
                </div>
              )}
            </div>
          ))}
      </div>
    );
  }
}

export default connect(null, {
  deleteItem,
  addNewAccount,
  deleteAccount,
  updateItem,
})(Content);
