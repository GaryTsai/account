import React, { Component } from "react";
import styles from "./styles";
import Radium from "radium";

const initialState = {
  isAddOpen: false,
  newAccount: "",
  accountList: [],
};
class accountTable extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  openAddModel = () => {
    this.setState({ isAddOpen: true }, () => {
      console.log(this.addInputBtn);
      this.addInputBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.keyCode === "13") this.submitNewAccount();
      });
    });
  };

  closeAddModel = () => {
    this.setState({ isAddOpen: false });
  };

  inputAccount = (account) => {
    this.setState({ newAccount: account });
  };

  submitNewAccount = () => {
    const { accountList, addNewAccount } = this.props;
    if (!this.state.newAccount) return;
    addNewAccount(accountList, this.state.newAccount);
    this.setState({ isAddOpen: false });
  };

  delete = (account) => {
    const { accountList, deleteAccount } = this.props;
    let index = accountList.indexOf(account);
    if (index !== -1) {
      accountList.splice(index, 1);
    }
    deleteAccount(accountList);
  };
  

  render() {
    const { isAddOpen } = this.state;
    const { closeCallback, selectCallback, idx, accountList } = this.props;

    return (
      <div
        style={{
          position: "absolute",
          display: "inline-flex",
          height:
            window.screen.width <= 500
              ? "calc(100% - 336px)"
              : "calc(100% - 295px)",
          width: "calc(100% - 4px)",
          zIndex: 7,
          bottom: "47px",
          backgroundColor: "rgb(234 233 233)",
          minWidth: "360px",
          maxWidth: "716px",
          padding: "10px 15px 0px 15px ",
          boxSizing: "border-box",
          webkitScrollbar: {
            display: "none",
          },
        }}
      >
        {!isAddOpen && (
          <div
            style={{
              overflow: "overlay",
              height: "calc(100% - 47px)",
              webkitScrollbar: {
                display: "none",
              },
              width: "100%",
              textAlign: "center",
            }}
          >
            {Object.keys(accountList).map((c) => (
              <div key={"accountFrame" + c} style={styles.selectAccount}>
                <p
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    margin: "5px 0px",
                    width: "80%",
                  }}
                  onClick={() => selectCallback(accountList[c], idx)}
                >
                  {accountList[c]}
                </p>

                <styles.DeleteHoverStyle
                  key={"accountDelete" + c}
                  onClick={(e) => this.delete(accountList[c])}
                ></styles.DeleteHoverStyle>
              </div>
            ))}
            <div
              key={"new-acccount"}
              style={{ ...styles.selectAccount, border: "none" }}
              onClick={this.openAddModel}
            >
              <p style={{ position: "relative", margin: "5px 0px" }}>
                + 新增帳戶
              </p>
            </div>
          </div>
        )}
        {isAddOpen && (
          <div style={{ display: "inline-flex", width: "100%" }}>
            <div style={styles.back} onClick={this.closeAddModel} />
            <div style={styles.newAccountFrame}>
              <div style={{ width: "30%", textAlign: "center" }}>
                <label style={styles.newAccountTitle}>新增帳戶名稱:</label>
              </div>
              <input
                type="text"
                ref={(el) => (this.addInputBtn = el)}
                style={styles.inputAccountFrame}
                value={this.state.newAccount}
                onChange={(c) => this.inputAccount(c.target.value)}
              />
              <styles.AddAccount
                key={"new-acccount-button"}
                onClick={this.submitNewAccount}
              >
                新增
              </styles.AddAccount>
            </div>
          </div>
        )}
        <styles.CloseBtn onClick={() => closeCallback()}>
          close
        </styles.CloseBtn>
      </div>
    );
  }
}

export default Radium(accountTable);
