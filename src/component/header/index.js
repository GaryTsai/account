import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles";
import eventEmitter from "../../eventTracking/eventEmitter";
import Time from "./time";
import utils from "../../utils/cookie";

const account = utils.getCookie("account");

export default class Header extends Component {

  logout = () => {
    utils.deleteAllCookies();
    eventEmitter.dispatch("accountLogOut", account.toString());
    window.location.replace(window.location.origin + "/login");
    localStorage.removeItem("pageRoute");
  };

  render() {
    var  pageRoute = window.localStorage.getItem("pageRoute")
    if (!account) return <div></div>;
    return (
      <div style={styles.header}>
        {
          <div style={{ position: "relative" }}>
            <Link to="account/total">
          {pageRoute !== "total" && (
            <img
              style={styles.headerIcon}
              alt="cost"
              title="annual expense page"
              onClick={() => {
                window.localStorage.setItem("pageRoute", "total");
                this.setState({ route: "total" });
              }}
              src={require("../../assets/img/cost-list.png")}
            />
          )}
        </Link>
        <Link to="account/home">
          {pageRoute !== "home" && (
            <img
              style={styles.headerIcon}
              alt="recode"
              title="record page"
              onClick={() => {
                window.localStorage.setItem("pageRoute", "home");
                this.setState({ route: "home" });
              }}
              src={require("../../assets/img/record.png")}
            />
          )}
        </Link>
        <Link to="account/chart">
          {pageRoute !== "chart" && (
            <img
              style={{ ...styles.headerIcon, backgroundColor:"white", borderRadius: '50%'}}
              alt="chart"
              title="expense chart page"
              onClick={() => {
                window.localStorage.setItem("pageRoute", "chart");
                this.setState({ route: "chart" });
              }}
              src={require("../../assets/img/chart.png")}
            />
          )}
        </Link>
        <Time />
        <img
          style={{ ...styles.headerIcon, position: "absolute", right: "0" }}
          alt=""
          onClick={() => {
            this.logout();
          }}
          src={require("../../assets/img/logout.png")}
        />
          </div>
        }
      </div>
    );
  }
}
