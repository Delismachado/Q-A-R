import React from 'react'

import { Switch, Route } from 'react-router-dom'

import SignIn from '../pages/SignIn'
import Home from '../pages/Home'
import SignUp from '../pages/SignUp'
import UserDashboard from '../pages/UserDashboard'
import AdminDashboard from '../pages/AdminDashboard'
import QuestionList from '../pages/QuestionList'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/sign-in" exact component={SignIn} />
    <Route path="/sign-up" exact component={SignUp} />
    <Route path="/user-dashboard" exact component={UserDashboard} />
    <Route path="/admin-dashboard" exact component={AdminDashboard} />
    <Route path="/question-list" exact component={QuestionList} />
  </Switch>
)

export default Routes
