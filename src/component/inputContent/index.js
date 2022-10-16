import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles";
import Radium from "radium";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import CategoryTable from "./categoryTable";
import AccountTable from "./accountTable";
import Content from "./contents";
import DatePickers from "../../utils/datePicker";
import {
  setMonthBudget,
  fetchAccountBudget,
  addNewItem,
  updateDate,
  getAccounts,
  addNewAccount,
  deleteAccount,
} from "../../actions";
import eventEmitter from "../../eventTracking/eventEmitter";
const account = window.localStorage.getItem("account");

const initialState = {
  inputCategory: "早餐",
  inputContent: "",
  inputValue: "",
  inputAccount: "現金",
  date: new Date().getDate().toString(),
  isOpen: false,
  isOpenCategoryTable: false,
  isOpenAccountTable: false,
  isSmallDevice: window.innerWidth <= 500,
};

class InputContent extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  itemCheck = () => {
    const { inputValue } = this.state;

    if (!inputValue) return false;
    return true;
  };

  componentDidMount() {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 500) {
        this.setState({ isSmallDevice: true });
      } else this.setState({ isSmallDevice: false });
    });
    this.props.fetchAccountBudget();
    this.props.getAccounts();
  }

  submitContent = () => {
    if (!this.itemCheck()) {
      return;
    }
    let timestamp = Math.floor(Date.now() / 1000);
    this.props.addNewItem({
      timestamp: timestamp,
      date: this.props.recordDate,
      accountClass: this.state.inputAccount,
      itemClass: this.state.inputCategory,
      itemContent: this.state.inputContent,
      itemValue: this.state.inputValue,
    });
    eventEmitter.dispatch("itemInsert", this.state.inputCategory.toString());
    this.setState({ inputContent: "", inputValue: "" });
  };

  inputContent = (content) => this.setState({ inputContent: content });

  inputValue = (value) => {
    if (!isNaN(value)) {
      return this.setState({ inputValue: value });
    }
    return;
  };

  inputCategory = (value) => this.setState({ inputCategory: value });

  inputAccountContent = (account) => this.setState({ inputAccount: account });

  monthOfCost = () => {
    if (this.props.monthItems === []) return;
    let result = 0;
    for (let i = 0; i < this.props.monthItems.length; i++) {
      result += parseInt(this.props.monthItems[i].itemValue);
    }
    return result;
  };

  todayOfCost = (dayItems) => {
    if (!dayItems) return;
    let result = 0;
    Object.values(dayItems).map((c) => (result += parseInt(c.itemValue)));
    return result;
  };

  inputBudget = (budget) => {
    if (!isNaN(budget)) {
      return this.props.setMonthBudget(budget);
    }
    return;
  };

  handleChange = (date) => {
    this.props.updateDate(date);
    eventEmitter.dispatch("datePicker", date.toString());
  };

  handleCancel = () => this.setState({ isOpen: false });

  handleSelect = (time) => this.setState({ time, isOpen: false });

  handleClick = () => {
    this.setState({ isOpen: true });
  };

  openCategoryList = () => {
    if (this.state.isOpenAccountTable) return;
    this.setState({ isOpenCategoryTable: true });
  };

  closeCategoryList = () => this.setState({ isOpenCategoryTable: false });

  openAccountList = () => {
    if (this.state.isOpenCategoryTable) return;
    this.setState({ isOpenAccountTable: true });
  };

  closeAccountList = () => this.setState({ isOpenAccountTable: false });

  changeCategory = (category) => {
    this.setState({ inputCategory: category, isOpenCategoryTable: false });
  };

  changeAccount = (account) => {
    this.setState({ inputAccount: account, isOpenAccountTable: false });
  };

  render() {
    const {
      monthOfBudget,
      month,
      day,
      remainDays,
      todayItems,
      accountList,
      addNewAccount,
      deleteAccount,
      recordDate,
    } = this.props;
    const { isOpenCategoryTable, isOpenAccountTable, isSmallDevice } =
      this.state;
    const percentage = (
      ((monthOfBudget - this.monthOfCost()) / monthOfBudget) *
      100
    ).toFixed(0);
    console.log('-------------');
    return (
      <div>
        <div style={styles.mainExpense}>
          <div style={styles.expenseOfStyle}>
            {month} 月花費:{" "}
            <span style={styles.expense}>
              {this.monthOfCost()} <span style={styles.unit}>$NT</span>
            </span>
          </div>
          <div style={styles.expenseOfStyle}>
            該日花費:{" "}
            <span style={styles.expense}>
              {this.todayOfCost(todayItems)}{" "}
              <span style={styles.unit}>$NT</span>
            </span>
          </div>
          <div style={styles.expenseOfStyle}>
            實際支出:{" "}
            <span style={styles.expense}>
              {(this.monthOfCost() / day).toFixed(0)}{" "}
              <span style={styles.unit}>$NT/天</span>
            </span>
          </div>
        </div>
        <div style={styles.secondExpense}>
          <div style={styles.expenseOfStyle}>
            剩餘天數:{" "}
            <span style={styles.expense}>
              {remainDays} <span style={styles.unit}>天</span>
            </span>
          </div>
          <div style={{ width: 65, height: 65 }}>
            <CircularProgressbar
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.25,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Text size
                textSize: "30px",
                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,
                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',
                // Colors
                pathColor: `rgba(232, 115, 24, ${percentage / 20})`,
                textColor:
                  parseInt(percentage) > 0 ? "rgb(206 90 0)" : "#f44336",
                trailColor: parseInt(percentage) > 0 ? "#9e9e9e" : "#f44336",
              })}
              strokeWidth={12}
              trailColor={"#ffffff"}
              value={percentage}
              text={`${percentage}%`}
            />
          </div>
          <div style={styles.expenseOfStyle}>
            剩餘花費:{" "}
            <span style={styles.remaining}>
              {monthOfBudget - this.monthOfCost()}{" "}
              <span style={styles.unit}>$NT</span>
            </span>
          </div>
        </div>
        <div style={styles.inputBudget}>
          <div style={{ width: isSmallDevice ? "50%" : "33%" }}>
            <DatePickers recordDate={this.props.recordDate} changeCallback={(date) => this.handleChange(date)} />
          </div>
          {!isSmallDevice && (
            <div
              style={{
                width: "33%",
              }}
            >
              <span style={styles.span}>預估預算: </span>
              <input
                type="text"
                style={styles.styleOfInput}
                value={monthOfBudget}
                onChange={(c) => this.inputBudget(c.target.value)}
                inputMode="numeric"
              />
              <span style={styles.span}> $NT</span>
            </div>
          )}
          {!isSmallDevice && (
            <span style={{ ...styles.span, whiteSpace: "nowrap" }}>
              剩餘預算/天:{" "}
              <span style={styles.span}>
                {Math.round((monthOfBudget - this.monthOfCost()) / remainDays)}
              </span>
              <span style={styles.span}>元</span>
            </span>
          )}
        </div>
        {isSmallDevice && (
          <div style={{ ...styles.inputBudget }}>
            <div
              style={{
                width: "50%",
              }}
            >
              <span style={styles.span}>預估預算: </span>
              <input
                type="text"
                style={styles.styleOfInput}
                value={monthOfBudget}
                onChange={(c) => this.inputBudget(c.target.value)}
                inputMode="numeric"
              />
              <span style={styles.span}> $NT</span>
            </div>
            <span
              style={{ ...styles.span, width: "50%", whiteSpace: "nowrap" }}
            >
              剩餘預算/天:{" "}
              <span style={styles.span}>
                {Math.round((monthOfBudget - this.monthOfCost()) / remainDays)}
              </span>
              <span style={styles.span}>元</span>
            </span>
          </div>
        )}
        <div style={styles.inputContainer}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <label style={styles.inputTitle}>帳戶: </label>
            <div
              style={{
                ...styles.styleOfSelectCategory,
                border: "2px solid #ffbf00",
                width: "100%",
              }}
              onClick={() => this.openAccountList()}
            >
              {this.state.inputAccount}
            </div>
            {isOpenAccountTable && (
              <AccountTable
                accountList={accountList}
                addNewAccount={addNewAccount}
                deleteAccount={deleteAccount}
                account={localStorage.getItem("account")}
                closeCallback={() => this.closeAccountList()}
                selectCallback={this.changeAccount}
              />
            )}
            <label style={styles.inputTitle}>類別: </label>
            <div
              style={{ ...styles.styleOfSelectCategory, width: "100%" }}
              onClick={() => this.openCategoryList()}
            >
              {this.state.inputCategory}
            </div>
            {isOpenCategoryTable && (
              <CategoryTable
                closeCallback={() => this.closeCategoryList()}
                selectCallback={this.changeCategory}
              />
            )}
            <label style={styles.inputTitle}>備註: </label>
            <input
              type="text"
              style={styles.inputFrame}
              value={this.state.inputContent}
              onChange={(c) => this.inputContent(c.target.value)}
            />
            <label style={styles.inputTitle}>費用: </label>
            <input
              type="text"
              style={styles.inputFrame}
              value={this.state.inputValue}
              onChange={(c) => this.inputValue(c.target.value)}
              inputMode="numeric"
            />
            {!isSmallDevice && (
              <styles.SubmitItemBtn
                type="submit"
                key={"item-submit"}
                onClick={() => this.submitContent()}
              >
                儲存
              </styles.SubmitItemBtn>
            )}
          </div>
        </div>
        {isSmallDevice && (
          <styles.SubmitItemBtn
            mobile={true}
            type="submit"
            key={"item-submit"}
            onClick={() => this.submitContent()}
          >
            儲存
          </styles.SubmitItemBtn>
        )}
        <Content
          account={account}
          accountList={accountList}
          todayItems={todayItems}
          dateTime={recordDate}
        />
      </div>
    );
  }
}
export default connect(
  ({ itemList, accountInfo }) => ({
    ...accountInfo,
    ...itemList,
    monthOfBudget: accountInfo.monthBudget
      ? parseInt(accountInfo.monthBudget)
      : 0,
    todayItems:
      itemList.allitems &&
      itemList.allitems.filter((item) => {
        return item.date.includes(itemList.recordDate);
      }),
    monthItems:
      itemList.allitems &&
      itemList.allitems.filter((item) => {
        const whichMonth = itemList.recordDate.slice(0, 7);
        return item.date.includes(whichMonth);
      }),
  }),
  {
    setMonthBudget,
    fetchAccountBudget,
    addNewItem,
    updateDate,
    getAccounts,
    addNewAccount,
    deleteAccount,
  }
)(Radium(InputContent));
