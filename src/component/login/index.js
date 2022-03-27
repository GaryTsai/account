import React, { Component } from "react";
import styles from "./styles";
import firebase from "../../utils/firebaseConfig";

import eventEmitter from "./../../eventTracking/eventEmitter";
import GoogleSignIn from "./googleLogin";
import FaceBookSignIn from "./facebookLogin";
import AlertForRegister from "./alertForRegister";
import LoginTab from "./loginTab";
import cookie from "../../utils/cookie";
import {createBrowserHistory} from 'history';
let history = createBrowserHistory();
const initialState = {
  email: "",
  password: "",
  error: false,
  message: "",
  loginStatus: "login",
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentWillUnmount() {
    window.document.removeEventListener(
      "keydown",
      function (e) {
        if (e.keyCode === 13)
          this.loginSubmitWithKeydown(this.state.loginStatus);
      }.bind(this)
    );
  }

  componentDidMount() {
    window.localStorage.setItem("pageRoute", "login");
    window.document.addEventListener(
      "keydown",
      function (e) {
        if (e.keyCode === 13)
          this.loginSubmitWithKeydown(this.state.loginStatus);
      }.bind(this)
    );
  }

  loginSubmitWithKeydown = () => this.getStatusMethod(this.state.loginStatus);

  inputPassword = (password) => this.setState({ password });

  inputEmail = (email) => this.setState({ email: email });

  loginCheck = (email, pwd) => {
    // Output the input error
    if (!email && !pwd) {
      this.setState({ error: true, message: "Please input email&password" });
      setTimeout(() => this.setState({ error: false, message: "" }), 5000);
      return;
    }
    //Identify what whether the user already exists
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      .then(() => {
        var user = firebase.auth().currentUser;
        if (user) {
          cookie.setCookie('account', user.uid, 15)
          eventEmitter.dispatch("accountLogIn", user.uid.toString());
          localStorage.setItem("pageRoute", "home");
          history.push('/account/home');
          window.location.reload();
        }
      })
      .catch((error) => {
        this.setState({ error: true, message: error.message });
        setTimeout(() => this.setState({ error: false, message: "" }), 5000);
        return;
      });
  };

  register = (email, pwd) => {
    // Output the input error
    if (!email && !pwd) {
      this.setState({ error: true, message: "Please input email&password" });
      setTimeout(() => this.setState({ error: false, message: "" }), 5000);
      return;
    }
    //Create the user account and check whether the user already exists
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pwd)
      .then((userInfo) => {
        // Store the user Info
        firebase
          .database()
          .ref(`/account/${userInfo.user.uid}`)
          .set({
            signup: new Date().getTime(),
            email,
          })
          .then(() => {
            // Memorize the account and pageRoute and redirect to next page
            cookie.setCookie('account', userInfo.user.uid, 15)
            eventEmitter.dispatch(
              "accountRegister",
              userInfo.user.uid.toString()
            );
            console.log("Register successfully");
            localStorage.setItem("pageRoute", "home");
            history.push('/account/home');
          });
      })
      .catch((error) => {
        // Show error message
        this.setState({
          error: true,
          message: error.message.toString(),
        });
        console.log("Register failed");
        return;
      });
  };

  resetPassWordMail = (email) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        window.alert("已發送信件至信箱，請按照信件說明重設密碼");
        window.location.reload(); // Reload the page after sending email
      })
      .catch(function (error) {
        this.setState({ error: true, message: error });
        setTimeout(() => this.setState({ error: false, message: "" }), 5000);
        console.log(error.message);
      });
  };

  signInWithGoogleAccount = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (
          this.state.loginStatus === "register" &&
          !result.additionalUserInfo.isNewUser
        ) {
          this.setState({
            error: true,
            message:
              "The Google email of account is exist, please" +
              " use other email",
          });
          setTimeout(() => this.setState({ error: false, message: "" }), 5000);
          return;
        }
        firebase
          .database()
          .ref(`/account/${result.user.uid}`)
          .set({
            signup: new Date().getTime(),
            email: result.user.email,
          })
          .then(() => {
            // Show register info
            cookie.setCookie("account", result.user.uid, 15)
            eventEmitter.dispatch(
              "accountRegister",
              result.user.uid.toString()
            );
            history.push('/account/home');
            console.log("Google email register successfully");
          })
          .catch((err) => {
            // Show error when register failed
            this.setState({
              error: true,
              message: "Account is exist",
            });
            console.log("Register failed");
            return;
          });
      })
      .catch((error) => {
        this.setState({
          error: true,
          message: error.message.toString(),
        });
        setTimeout(() => this.setState({ error: false, message: "" }), 5000);
      });
  };

  signInWithFaceBookAccount = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (
          this.state.loginStatus === "register" &&
          !result.additionalUserInfo.isNewUser
        ) {
          this.setState({
            error: true,
            message:
              "The Facebook email of account is exist, please" +
              " use other email",
          });
          setTimeout(() => this.setState({ error: false, message: "" }), 5000);
          return;
        }
        if (result) {
          firebase
            .database()
            .ref(`/account/${result.user.uid}`)
            .set({
              signup: new Date().getTime(),
              email: result.user.email,
            })
            .then(() => {
              // Show register info
              cookie.setCookie('account', result.user.uid, 15)
              eventEmitter.dispatch(
                "accountRegister",
                result.user.uid.toString()
              );
              console.log("Google email register successfully");
            })
            .catch((err) => {
              // Show error when register failed
              this.setState({
                error: true,
                message: "Account is exist",
              });
              console.log("Register failed");
              return;
            });
        }
      })
      .catch((error) => {
        this.setState({
          error: true,
          message: error.message.toString(),
        });
        setTimeout(() => this.setState({ error: false, message: "" }), 5000);
      });
  };

  loginSelect = (status) => this.setState({ loginStatus: status });

  getStatusMethod = (loginStatus) => {
    switch (loginStatus) {
      case "login":
        return this.loginCheck(this.state.email, this.state.password);
      case "register":
        return this.register(this.state.email, this.state.password);
      case "forgetPWD":
        return this.resetPassWordMail(this.state.email);
      default:
        return;
    }
  };

  render() {
    const { error, message, loginStatus } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.loginFrame}>
          <div style={styles.loginModal}>
            <div
              style={{
                ...styles.logo,
                backgroundImage:
                  "url(" + require("./../../assets/img/logo.png") + ")",
              }}
            ></div>
            <LoginTab
              loginStatus={loginStatus}
              loginSelect={this.loginSelect}
            />
            {loginStatus !== "forgetPWD" && (
              <div>
                <div style={styles.inputEmail}>
                  <input
                    style={styles.inputFrame}
                    name={"email"}
                    type="email"
                    value={this.state.email}
                    placeholder="請輸入帳號(email)"
                    onChange={(c) => this.inputEmail(c.target.value)}
                  />
                </div>
                <div style={styles.inputPassword}>
                  <input
                    style={styles.inputFrame}
                    name={"password"}
                    type="password"
                    value={this.state.password}
                    placeholder="請輸入密碼"
                    onChange={(c) => this.inputPassword(c.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  id="item-login-submit"
                  style={{ ...styles.loginSubmit }}
                  onClick={() => this.getStatusMethod(loginStatus)}
                >
                  確定
                </button>
              </div>
            )}
            {loginStatus === "forgetPWD" && (
              <div style={{ ...styles.inputEmail, lineHeight: "34px" }}>
                <div>請填入你的帳號(email): </div>
                <input
                  style={{ ...styles.inputFrame, marginBottom: "30px" }}
                  name={"email"}
                  type="email"
                  value={this.state.email}
                  onChange={(c) => this.inputEmail(c.target.value)}
                />
                <button
                  type="submit"
                  id="item-login-submit"
                  style={{ ...styles.loginSubmit, border: "2px solid #ff730e" }}
                  onClick={() => this.getStatusMethod(loginStatus)}
                >
                  確定
                </button>
              </div>
            )}
            {loginStatus === "forgetPWD" && (
              <span style={styles.resetText}>
                請至填入的mail信箱重設您的密碼
              </span>
            )}
            {loginStatus !== "forgetPWD" && (
              <div>
                <GoogleSignIn
                  loginStatus={loginStatus}
                  signInWithGoogleAccount={this.signInWithGoogleAccount}
                />
                <FaceBookSignIn
                  loginStatus={loginStatus}
                  signInWithFaceBookAccount={this.signInWithFaceBookAccount}
                />
                <AlertForRegister loginStatus={loginStatus} />
              </div>
            )}
            {error && <div style={styles.error}>{message}</div>}
          </div>
        </div>
      </div>
    );
  }
}
