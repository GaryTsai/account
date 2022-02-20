import styled from "styled-components";

export default {
  ChartTab: styled.div`{
    cursor: pointer;
    width: 50%;
    background-color: white;
    padding: 5px;
    z-index: 0;
    &:hover {
      opacity: 0.8;
      background-color: #d5d4ec;
    },
    box-shadow: ${(props) => props.activeStatus ?  "0px 8px 15px rgb(0 0 0 / 20%)" : "unset" };
      border: ${(props) => props.activeStatus ? "2px solid black" : "none" };
      background-color: ${(props) => props.activeStatus ?  "cornflowerblue" : "white"};
      box-sizing: ${(props) => props.activeStatus ?  "border-box" : "unset"};
    }
  }`,
  SelectTime: styled.div`
     {
      background-color: #b8dbff;
      text-align: center;
      color: black;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
        background-color: #a0c5ec;
      }
    }
  `,
  activeChart: {
    boxShadow: " 0px 8px 15px rgb(0 0 0 / 20%)",
    cursor: "pointer",
    width: "50%",
    border: "2px solid black",
    backgroundColor: "cornflowerblue",
    padding: "5px",
    boxSizing: "border-box",
  },
  chart: {
    cursor: "pointer",
    width: "50%",
    backgroundColor: "white",
    padding: "5px",
    zIndex: 0,
    ":hover": {
      opacity: 0.8,
      backgroundColor: "#d5d4ec",
    },
  },
  snapShotButton: {
    height: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ec3718",
    color: "white",
    borderRadius: "15px",
    border: "2px solid #a00404",
    margin: "5px",
    float: "left",
    outline: "none",
    cursor: "pointer",
  },
};
