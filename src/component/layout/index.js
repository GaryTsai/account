import React, { Fragment } from "react";

const Layout = (props) => {
  return (
    // 用<div>Fragment 不會在DOM裡面增加節點
    <Fragment>
      {/* <div className="App-header">
        <Header/>
      </div> */}
      <div
        style={{
          width: "calc(100% - 4px)",
          height: "calc(100% - 48px)",
          backgroundColor: "whitesmoke",
          borderTop: "0px",
          borderRight: "2px",
          borderLeft: "2px",
          borderBottom: "2px",
          borderStyle: "solid",
          borderColor: "rgb(0, 185, 156)",
        }}
      >
        {props.children}
      </div>
    </Fragment>
  );
};

export default Layout;
