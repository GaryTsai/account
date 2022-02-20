import styled from 'styled-components';

export default {
  container: {
    width: "100vw",
    height: "100vh",
  },
  styleOfYear: {
    width: "100%",
    height: "44px",
    cursor: "pointer",
    display: "flex",
    color: "black",
    fontSize: "18px",
    alignItems: "center",
    backgroundColor: "rgb(255, 97, 97)",
    boxSizing: "border-box",
    padding: "0% 1%",
    borderBottom: "solid 3px #c53400",
    position: "relative",
  },
  MonthContainer: styled.div`{
    max-height: ${props => props.show ? '1000px': '0'};
    overflow: hidden;
    transition: max-height .5s ease;
    }
  `,
  MonthExpense: styled.li`{
    width: 100%;
    height: 44px;
    display: flex;
    color: black;
    font-size: 18px;
    justify-content: space-around;
    align-items: center;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 0% 1%;
    border-bottom: 1px solid black;
    cursor: pointer;
    list-style-type: none;
    &:hover {
      background-color: rgb(255 153 153);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
    }
  },`,
};
