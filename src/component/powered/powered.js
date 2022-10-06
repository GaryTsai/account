import React, { Component } from "react";
import styled from "styled-components";

const initialState = {
  year: 0,
};
export default class Powered extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  getCurrentYear = () => new Date().getFullYear();

  componentDidMount() {
    this.setState({ year: this.getCurrentYear() });
  }

  render() {
    const { year } = this.state;
    const PoweredContainer = styled.div`
      bottom: 0px;
      position: relative;
      left: -2px;
      width: 100%;
      margin: auto;
    `;
    const PoweredStyle = styled.div`
      width: calc(100% - 4px);
      max-width: 716px;
      background-color: white;
      background: #ff7600;
      color: white;
      bottom: 1px;
      font-size: 12px;
      text-align: center;
      position: fixed;
      height: 44px;
      line-height: 44px;
      border-style: solid;
      border-color: rgb(0,185,156);
      border-width: 0 2px 2px 2px;
    `;
    return (
      <PoweredContainer>
        <PoweredStyle>Copyright© {year} Gary Tsai</PoweredStyle>
      </PoweredContainer>
    );
  }
}
