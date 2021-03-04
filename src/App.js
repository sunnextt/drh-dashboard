import React from 'react';
import Layout from 'layouts/DashboardLayout/Layout.js';
import "styles/App.scss";
import { Router, Route, Switch } from "react-router-dom";
import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterPage from "views/RegisterPage/RegisterPage.js";
import routes from "routes"


import { createBrowserHistory } from "history";

const hist = createBrowserHistory();

const App = () => {

  return (
      <Router history={hist}>
  <Switch>
    {/* admin Route */}
    <Route exact from="/" render={(props) => <Layout routes={routes} />} />
    {/*Landing Page Routes */}
    <Route exact from="/login" render={(props) => <LoginPage {...props} />} />
    <Route exact from="/register" render={(props) => <RegisterPage {...props} />} />
  </Switch>
</Router>
  );
};

export default App;
