import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Screen from "./components/screen";
import ScreenList from "./components/screenList";

function AppRoot() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ScreenList} />
          <Route path="/screens" exact component={ScreenList} />
          <Route path="/screens/:screenId" component={Screen} />
          <Route component={ScreenList} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default AppRoot;
