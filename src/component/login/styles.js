export default {
  container: {
    position: "absolute",
    height: "100%",
    display: "block",
    zIndex: 7,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  loginFrame: {
    height: "100%",
    width: "100%",
    background: "white",
    zIndex: 5,
    opacity: "1",
    minWidth: "360px",
    maxWidth: "720px",
    fontFamily: "sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
  },
  register: {
    padding: "4px 50px",
    background: "white",
    color: "white",
    cursor: "pointer",
    outline: "none",
    borderBottom: "2px solid #009688",
  },
  login: {
    padding: "4px 50px",
    background: "white",
    borderStyle: "black",
    borderBottom: "2px solid #009688",
    color: "white",
    cursor: "pointer",
    outline: "none",
  },
  forgetPWD: {
    padding: "4px 50px",
    background: "white",
    borderStyle: "black",
    border: "none",
    color: "white",
    cursor: "pointer",
    outline: "none",
    borderBottom: "2px solid #ff730e",
  },
  error: {
    backgroundColor: "white",
    color: "red",
    fontSize: "16px",
    position: "absolute",
    padding: "3% 0%",
    width: "80%",
    margin: "10%",
    display: "flex",
    marginTop: "10%",
    borderRadius: "10px",
    boxSizing: "border-box",
    fontFamily: "sans-serif",
    justifyContent: "center",
    border: "3px solid red",
  },
  inputEmail: {
    color: "black",
    textAlign: "center",
    margin: "5% 11%",
    transform: "scale(1.05)",
  },
  inputPassword: {
    color: "black",
    textAlign: "center",
    margin: "5% 11%",
    fontSize: "15px",
    transform: "scale(1.05)",
  },
  loginModal: {
    textAlign: "center",
    position: "relative",
    top: "10%",
    height: "100%",
  },
  loginSubmit: {
    padding: "6px 50px",
    borderRadius: "10px",
    background: "#ffffff",
    borderStyle: "black",
    color: "#000000",
    cursor: "pointer",
    outline: "none",
    border: "2px solid rgb(0, 162, 87)",
  },
  logo: {
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    height: "180px",
    width: "80%",
    margin: "0px auto",
  },
  icon: {
    height: "16px",
    width: "16px",
  },
  inputFrame: {
    height: "30px",
    padding: "6px 4px",
    backgroundColor: "#fff",
    border: "1px solid #D1D1D1",
    borderRadius: "4px",
    boxShadow: "none",
    boxSizing: "border-box",
    width: "100%",
    fontSize: "14px",
    margin: "5px",
  },
  resetText: {
    display: "block",
    fontWeight: "bold",
    padding: "20px",
  },
};
