import React, { useEffect } from 'react'
import Login from "./components/Login/Login";
import SignUp from "./components/SignUP/SignUp";
import Notes from "./components/Notes/Notes";
import NotFound from "./components/NotFound/NotFound";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.token) history.push('/notes')
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/sign-in" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/notes" component={Notes} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
