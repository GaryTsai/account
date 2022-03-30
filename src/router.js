import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import "./router.css";
import Loading from "./component/loading";
import Layout from "./component/layout";
import Login from "./component/login";
import InputContent from "./component/inputContent";
import Powered from "./component/powered/powered";
import AnnualExpense from "./component/annualExpense";
import DailyExpense from "./component/charts";
import Header from "./../src/component/header";
import { fetchItems } from "./actions";
import utils from "./utils/cookie";

const RootRouter = ({ fetchItems }) => {
  const [pageRoute, setPageRoute] = useState('login');
  const account = utils.getCookie('account')
  
  const changePageRoute = pageRoute => {
    if(pageRoute === "home")
      fetchItems();
    setPageRoute(pageRoute);
  }
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  if (!account) {
    window.localStorage.setItem("pageRoute", "login");
    return (
      <Router basename="account/">
        <div className="App" style={{ height: "100vh" }}>
          <Routes>
            <Route
              path="login"
              element={<Login account={account} changePageRoute={changePageRoute}/>}
            />
            <Route path="*"  element={<Navigate to="login" replace />} />
          </Routes>
          <Powered />
        </div>
      </Router>
    );
  } else {
    return (
      <Router basename="account/">
        <div className="App" style={{ height: "100vh", overflowY: "scroll", position: "relative"}}>
          <Loading />
          <Layout>
          <div className="App-header">
            <Header changePageRoute={changePageRoute}/>
          </div>
            <Routes>
              <Route path="home" element={<InputContent/>} />
              <Route path="total" element={<AnnualExpense/>} />
              <Route path="chart" element={<DailyExpense/>} />
              <Route path="*"  element={<Navigate to="home" replace />} />
            </Routes>
            <Powered />
          </Layout>
        </div>
      </Router>
    );
  }
};

export default connect(null, { fetchItems })(RootRouter);
