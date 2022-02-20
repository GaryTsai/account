import React, { Component } from "react";
import category from "./category";
import styles from "./styles";
import Radium from "radium";
const initialState = {
};
class categoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    const { closeCallback, selectCallback, idx } = this.props;
    return (
      <div
        style={{
          position: "absolute",
          height:
            window.screen.width <= 500
              ? "calc(100% - 336px)"
              : "calc(100% - 295px)",
          width: "calc(100% - 4px)",
          zIndex: 7,
          bottom: "47px",
          backgroundColor: "rgb(234 233 233)",
          maxWidth: "716px",
          minWidth: "360px",
          padding: "10px 15px 0px 15px",
          boxSizing: "border-box",
          webkitScrollbar: {
            display: "none",
          },
        }}
      >
        <div
          style={{
            overflow: "overlay",
            webkitScrollbar: {
              display: "none",
            },
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "initial",
            width: "100%",
            margin: "0 auto"
          }}
        >
          {/* <div> */}
          {Object.keys(category).map((c) => (
            <styles.CategoryFrame
              key={"categoryFrame" + c}
              onClick={() => selectCallback(category[c].className, idx)}
            >
              <div
                key={"category" + c}
                style={{
                  backgroundSize: "100%",
                  width: "35px",
                  height: "35px",
                  backgroundRepeat: "no-repeat",
                  zIndex: "5",
                  margin: "5px auto",
                  backgroundImage:
                    "url(" +
                    require("./../../../assets/img/" + category[c].resource) +
                    ")",
                }}
              />
              <p style={{ position: "relative", margin: "5px 0px" }}>
                {category[c].className}
              </p>
            </styles.CategoryFrame>
          ))}
          {/* </div> */}
        </div>
        <styles.CloseBtn onClick={() => closeCallback()}>
          close
        </styles.CloseBtn>
      </div>
    );
  }
}

export default Radium(categoryTable);
