import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { Container } from "@material-ui/core";
import axiosConfig from "./utils/axiosConfig";
import loadLocalStorage from "./utils/loadLocalStorage";

import "./App.css";
import store from "./redux";
import PrivateRoute from "./components/common/PrivateRoute";
import AdminRoute from "./components/common/AdminRoute";
import { AdminRoutes, UserRoutes, GuestRoutes } from "./routes";
import AppProvider from "./AppProvider";
import Navbar from "./components/layout/Navbar";
import AdminNavbar from "./components/admin/navbar";
import Footer from "./components/layout/Footer";
import Utils from "./components/utils";
import PageNotFound from "./components/404";

axiosConfig();
loadLocalStorage();

export default function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <Switch>
          <AdminRoute path="/admin" component={AdminNavbar} />
          <Route path="/" component={Navbar} />
        </Switch>
        <Container maxWidth={false} style={{ minHeight: "82vh" }}>
          <Switch>
            {GuestRoutes.map(r => (
              <Route exact path={r.path} component={r.component} key={r.path} />
            ))}

            {UserRoutes.map(r => (
              <PrivateRoute
                exact
                path={r.path}
                component={r.component}
                key={r.path}
              />
            ))}

            {AdminRoutes.map(r => (
              <AdminRoute
                exact
                path={r.path}
                component={r.component}
                key={r.path}
              />
            ))}

            <Route component={PageNotFound} />
          </Switch>
        </Container>
        <Footer />
        <Utils />
      </AppProvider>
    </Provider>
  );
}
