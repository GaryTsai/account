import styled from "styled-components";

export default {
  inputContainer: {
    height: "45px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "black",
    fontSize: "14px",
    borderTop: "solid 1px black",
    backgroundColor: "white",
    boxSizing: "border-box",
  },
  inputLabel: {
    color: "black",
    fontSize: "16px",
  },
  inputFrame: {
    height: "30px",
    padding: "6px 4px",
    backgroundColor: "#fff",
    border: "1px solid #D1D1D1",
    borderRadius: "4px",
    boxShadow: "none",
    boxSizing: "border-box",
    width: "100%",
    fontSize: "14px",
    margin: "5px",
  },
  SubmitItemBtn: styled.button`
    height: 30px;
    width: 100%;
    background: #ffcc5b;
    border-bottom: none;
    border-right: none;
    border-left: none;
    cursor: pointer;
    font-size: 14px;
    margin: 0 auto;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease 0s;
    outline: none;
    white-space: nowrap;                
    margin: ${props => props.mobile ? "0px" : '0px 5px'};
    border-radius: ${props => props.mobile ? "0px" : '10px'};
    border-top:  ${props => props.mobile ? "1px solid black" : 'none'};
    &:hover {
      background: #FFA500;
    }
  }`,
  inputTitle: {
    color: "#4376ff",
    whiteSpace: "nowrap",
  },
  inputBudget: {
    height: "40px",
    position: "relative",
    top: "0px",
    left: "0px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: "1%",
    fontSize: "14px",
    backgroundColor: "white",
    borderTop: "1px solid black",
  },
  styleOfInput: {
    width: "30%",
    borderRadius: "5px",
    border: "solid 1px #87CEFA",
    height: "20px",
    fontSize: "16px",
  },
  span: {
    color: "black",
    width: "33%",
  },
  mainExpense: {
    width: "100%",
    height: "80px",
    borderTop: "solid 1px black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "black",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
  },
  secondExpense: {
    width: "100%",
    height: "80px",
    borderTop: "solid 1px black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    fontSize: "14px",
    backgroundColor: "rgb(255, 255, 255)",
    boxSizing: "border-box",
  },
  expenseOfStyle: {
    width: "33%",
    textAlign: "center",
    fontSize: "16px",
    color: "#000000",
  },
  remaining: {
    display: "block",
    fontSize: "20px",
    color: "rgb(33 208 83)",
  },
  expense: {
    display: "block",
    fontSize: "20px",
    color: "#FF2416",
  },
  unit: {
    color: "#000000",
    fontSize: "14px",
  },
  styleOfSelectCategory: {
    display: "flex",
    justifyContent: "center",
    height: "26px",
    alignItems: "center",
    background: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    borderRadius: "10px",
    margin: "5px",
    boxShadow: "rgb(0 0 0 / 20%) 0px 8px 15px",
    transition: "all 0.3s ease 0s",
    outline: "none",
    border: "2px solid rgb(0, 150, 136)",
    whiteSpace: "nowrap",
  },
  icon: {
    height: "16px",
    width: "16px",
  },
};
