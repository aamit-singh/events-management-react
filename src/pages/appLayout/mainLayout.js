import React from "react";

import Appbar from "./appbar";
import Events from "../events/events";
import AddEvent from "../events/addEvent";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Main = () => {
  return (
    <div className="App">
      <Appbar />
      <section className="App-header">
        <BrowserRouter>
          <Switch>
            <Route exact path="/events/overview" component={Events} />
            <Route exact path="/events/addEvent" component={AddEvent} />
          </Switch>
        </BrowserRouter>
      </section>
    </div>
  );
};

export default Main;
