import React from "react";
import styles from "./styles";
const FaceBookSignIn = ({loginStatus, signInWithGoogleAccount}) =>{
    return (
        <div className="OpenIdLoginModule" style={{textDecoration: "none", color: "black"}}>
        <div
          className="oauth-google-inner"
          onClick={() => signInWithGoogleAccount()}
        >
          <img
            alt={"facebook logo"}
            style={styles.icon}
            src={require("./../../assets/img/facebook-icon.png")}
          />
          <div>
            {loginStatus === "login"
              ? "以 FaceBook 登入"
              : "以 FaceBook 註冊並登入"}
          </div>
        </div>
      </div>
      );
}

export default FaceBookSignIn