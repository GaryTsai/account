import styled from "styled-components";
export default {
  CategoryFrame: styled.li`
    background-color: white;
    display: inline-block;
    text-align: center;
    border-radius: 20px;
    cursor: pointer;
    height: 70px;
    border: 2px solid #8ec9f8;
    box-sizing:border-box;
    &:hover {
      background-color: rgba(0,123,209,0.74);
      boxShadow: inset 0px 1px 0px rgba(0, 0, 0, 0.1);
    }
    @media (min-width: 716px) {
      margin: 1% ${23/14}%;
      width: 11%;
    }
    @media screen and (min-width: 550px) and (max-width: 716px) {
      margin: 1% ${22/12}%;
      width: 13%;
    }
    @media screen and (max-width: 549px)  {
      margin: 1% 1%;
      width: 18%;
    }
    @media screen and (max-width: 450px)  {
      margin: 1% 2%;
      width: 21%;
    }
  `,
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
};
