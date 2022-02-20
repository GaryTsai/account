import React from "react";
import styles from "./styles";

const GoogleSignIn = ({loginStatus, signInWithGoogleAccount}) => {
  return (
    <div className="OpenIdLoginModule" style={{textDecoration: "none", color: "black"}}>
      <div
        className="oauth-google-inner"
        onClick={() => {
          return signInWithGoogleAccount()
        }}
      >
        <img
          alt={"google logo"}
          style={styles.icon}
          src={require("./../../assets/img/GGL_logo_googleg_18.png")}
        />
        <div>
          {loginStatus === "login" ? "以 Google 登入" : "以 Google 註冊並登入"}
        </div>
      </div>
    </div>
  );
};

export default GoogleSignIn
