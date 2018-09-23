import React from "react"
import { Route, Switch } from "react-router-dom"

import Login from "./Components/Login/Login"
import Dashboard from "./Components/Dashboard/Dashboard"
import BoardsList from  "./Components/BoardsList/BoardsList"
import TeamsList from "./Components/TeamsList/TeamsList"
import SingleBoard from "./Components/SingleBoard/SingleBoard"
import Team from "./Components/Team/Team"
import Task from "./Components/Task/Task"
import Account from "./Components/Account/Account"

export default <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/boards" component={BoardsList} />
    <Route path="/teams" component={TeamsList} />
    <Route path="/board/:boardid" component={SingleBoard} />
    <Route path="/team/:teamid" component={Team} />
    <Route path="/task/:taskid" component={Task} />
    <Route path="/account" component={Account} />
</Switch>