import React from "react";
import styles from "./styles";
const AlertForRegister = ({loginStatus}) => {
  
  if (loginStatus !== "register") return(<div></div>);

  return (
    <div className="tooltip">
      <img
        alt={"alert icon"}
        style={styles.icon}
        src={require("./../../assets/img/alert-icon.png")}
      />
      <span className="tooltiptext">
        Regardless of Faccebook or Google, the same email can only be registered
        once
      </span>
    </div>
  );
};

export default AlertForRegister;
