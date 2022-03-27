import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./router.css";
import Loading from "./component/loading";
import Layout from "./component/layout";
import Login from "./component/login";
import InputContent from "./component/inputContent";
import Powered from "./component/powered/powered";
import AnnualExpense from "./component/annualExpense";
import DailyExpense from "./component/charts";
import { fetchItems } from "./actions";
import utils from "./utils/cookie";
const account = utils.getCookie('account')

const RootRouter = ({ fetchItems }) => {
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  if (!account) {
    window.localStorage.setItem("pageRoute", "login");
    return (
      <Router>
        <div className="App" style={{ height: "100vh" }}>
          <Route
            exact
            path="/login"
            render={() => <Login account={account} />}
          />
          <Redirect to="/login" />
          <Powered />
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <div className="App" style={{ height: "100vh", overflowY: "scroll", position: "relative"}}>
          <Loading />
          <Layout>
            <Switch>
              <Route exact path="/home" component={InputContent} />
              <Route exact path="/total" component={AnnualExpense} />
              <Route exact path="/chart" component={DailyExpense} />
              <Redirect to="/home" />
            </Switch>
            <Powered />
          </Layout>
        </div>
      </Router>
    );
  }
};

export default connect(null, { fetchItems })(RootRouter);
