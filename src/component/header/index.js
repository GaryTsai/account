import React, { useEffect, Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles";
import eventEmitter from "../../eventTracking/eventEmitter";
import Time from "./time";
import utils from "../../utils/cookie";

const Header = (props)=> {

  const navigate = useNavigate();

  const logout = () => {
    const account = utils.getCookie("account");
    utils.deleteAllCookies();
    account && eventEmitter.dispatch("accountLogOut", account.toString());
    props.changePageRoute('login');
    localStorage.removeItem("pageRoute");
  };

  var  pageRoute  = window.localStorage.getItem("pageRoute")

  const account = utils.getCookie("account");
  if (!account) return <div></div>;
    return (
      <div style={styles.header}>
        {
          <div style={{ position: "relative" }}>
        <Link to="/total">
          {pageRoute !== "total" && (
            <img
              style={styles.headerIcon}
              alt="cost"
              title="annual expense page"
              onClick={() => {
                window.localStorage.setItem("pageRoute", "total");
              }}
              src={require("../../assets/img/cost-list.png")}
            />
          )}
        </Link>
        <Link to="/home">
          {pageRoute !== "home" && (
            <img
              style={styles.headerIcon}
              alt="recode"
              title="record page"
              onClick={() => {
                window.localStorage.setItem("pageRoute", "home");
              }}
              src={require("../../assets/img/record.png")}
            />
          )}
        </Link>
        <Link to="/chart">
          {pageRoute !== "chart" && (
            <img
              style={{ ...styles.headerIcon, backgroundColor:"white", borderRadius: '50%'}}
              alt="chart"
              title="expense chart page"
              onClick={() => {
                window.localStorage.setItem("pageRoute", "chart");
              }}
              src={require("../../assets/img/chart.png")}
            />
          )}
        </Link>
        <Time />
        <img
          style={{ ...styles.headerIcon, position: "absolute", right: "0" }}
          alt=""
          onClick={() => logout()}
          src={require("../../assets/img/logout.png")}
        />
          </div>
        }
      </div>
    );
  }


export default Header 