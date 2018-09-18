import React from "react"
import { Route, Switch } from "react-router-dom"

import Login from "./Components/Login/Login"
import Dashboard from "./Components/Dashboard/Dashboard"
import Board from "./Components/Board/Board"
import Team from "./Components/Team/Team"
import Task from "./Components/Task/Task"
import Account from "./Components/Account/Account"

export default <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/board/:boardid" component={Board} />
    <Route path="/team/:teamid" component={Team} />
    <Route path="/task/:taskid" component={Task} />
    <Route path="/Account" component={Account} />
</Switch>