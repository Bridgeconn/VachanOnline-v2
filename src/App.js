import React from "react";
import Landing from "./components/landing/Landing";
import ReadBible from "./components/read/ReadBible";
import Stories from "./components/stories/Stories";
import "./components/common/common.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
const App = () => (
  <BrowserRouter>
    <CssBaseline />
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/read" component={ReadBible} />
      <Route path="/biblestories" component={Stories} />
      <Route render={() => <h1>Page Not Found</h1>} />
    </Switch>
  </BrowserRouter>
);
export default App;
