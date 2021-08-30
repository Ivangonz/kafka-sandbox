// import React from 'react';
// import Home from '../views/Home';
import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import './App.css';
import { routes } from "../config/router";

function App() {
  return (
    <div>
          <BrowserRouter>
          {/* <Header /> */}
          <Switch>
            {/* //todo for specific redirections? wip */}
            <Redirect exact from="/details" to="/" />
            <Redirect exact from="/info" to="/" />
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={(props: RouteComponentProps<any>) => (
                    <route.component
                      name={route.name}
                      {...props}
                      {...route.props}
                    />
                  )}
                />
              );
            })}
          </Switch>
          {/* <Footer /> */}
        </BrowserRouter>
    </div>
  );
}

export default App;
