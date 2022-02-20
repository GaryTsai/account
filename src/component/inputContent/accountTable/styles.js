import styled from "styled-components";
import deleteUrl from "./../../../assets/img/delete-account.png"
export default {
  CloseBtn: styled.div`{
    position: absolute;
    bottom: 0px;
    width: 100%;
    text-align: center;
    background-color: rgb(249 137 129);
    padding: 2% 0%;
    left: 0;
    cursor: pointer;
    &:hover {
      background-color: rgb(236 57 44);
      box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.1);
    }
  }`,
  selectAccount: {
    backgroundColor: "white",
    margin: "8px",
    padding: "5px",
    display: "inline-flex",
    textAlign: "center",
    borderRadius: "15px",
    border: "2px solid #4376ff",
    justifyContent: "center",
    width: "40%",
    cursor: "pointer",
  },
  newAccountTitle: {
    color: "#4376ff",
    textAlign: "center",
    backgroundPosition: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
  },
  inputAccountFrame: {
    height: "30px",
    padding: "6px 4px",
    backgroundColor: "#fff",
    border: "1px solid #D1D1D1",
    borderRadius: "4px",
    boxShadow: "none",
    boxSizing: "border-box",
    width: "50%",
    fontSize: "14px",
    margin: "5px",
  },
  AddAccount: styled.button`
  height: 30px;
  width: 20%;
  background: #ffcc5b;
  border-top: 1px solid black;
  border-bottom: none;
  border-right: none;
  border-left: none;
  cursor: pointer;
  font-size: 14px;
  margin: 0 auto;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease 0s;
  outline: none;
  margin: 0px 5px;
  border-radius: 10px;
  border-top: none;
  white-space: nowrap;
  &:hover {
    background: #FFA500;
  }
}`,
  newAccountFrame: {
    width: "100%",
    background: "white",
    height: "10%",
    borderRadius: "15px",
    padding: "5px",
    display: "inline-flex",
    alignItems: "center",
    border: "2px solid #c9c9ec",
  },
  back: {
    cursor: "pointer",
    width: "50px",
    height: "10%",
    padding: "5px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(" + require("./../../../assets/img/back.png") + ")",
    backgroundSize: "50px 50px",
  },
  DeleteHoverStyle: styled.div`
  cursor: pointer;
  width: 20%;
  margin: 5px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${deleteUrl});
  background-size: 15px;
  &:hover {
    transform: scale(1.5)
  }
  `
};
