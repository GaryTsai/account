import React from "react";
import styles from "./styles";

const LoginTab = ({loginStatus, loginSelect}) => {
    return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        whiteSpace: "nowrap",
      }}
    >
      <div
        id="item-submit"
        style={{
          ...styles.login,
          color: loginStatus === "login" ? "white" : "black",
          backgroundColor: loginStatus === "login" ? "#009688" : "white",
        }}
        onClick={() => loginSelect("login")}
      >
        登入
      </div>
      <div
        id="item-submit"
        style={{
          ...styles.register,
          color: loginStatus === "register" ? "white" : "black",
          backgroundColor: loginStatus === "register" ? "#009688" : "white",
        }}
        onClick={() => loginSelect("register")}
      >
        註冊
      </div>
      <div
        id="item-submit"
        style={{
          ...styles.forgetPWD,
          color: loginStatus === "forgetPWD" ? "white" : "black",
          backgroundColor: loginStatus === "forgetPWD" ? "#ff730e" : "white",
        }}
        onClick={() => loginSelect("forgetPWD")}
      >
        忘記密碼
      </div>
    </div>
  );
};

export default LoginTab;
