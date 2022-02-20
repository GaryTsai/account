import React, { useState } from "react";
import styles from "./styles";

const Time = () => {
  const [currentTime, setCurrentTime] = useState();
  const showCurrentTime = () => window.setInterval(() => setCurrentTime(new Date().toLocaleTimeString()));
  showCurrentTime();

  return <span style={styles.timeStyle}>現在時間: {currentTime}</span>;
};

export default Time;
