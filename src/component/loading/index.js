import React, { Fragment } from "react"
import {connect} from "react-redux"
import styles from "./styles";

const loading = ({isLoading}) => {
  return (
    <Fragment>
      { isLoading && <div style={styles.container}>
      <img
        alt=""
        style={styles.loadingImg}
        src={require("./../../assets/img/loading.gif")}
      />
      </div>}
    </Fragment>
  );
};

export default connect(({itemList})=>({
  isLoading: itemList.isLoading
}))(loading);