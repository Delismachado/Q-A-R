import React from 'react'

import { Switch } from 'react-router-dom'
import Route from './Route'

import SignIn from '../pages/SignIn'
import Home from '../pages/Home'
import SignUp from '../pages/SignUp'
import UserDashboard from '../pages/UserDashboard'
import AdminDashboard from '../pages/AdminDashboard'
import QuestionList from '../pages/QuestionList'
import AnswerQuestion from '../pages/AnswerQuestion'
import UserAnswers from '../pages/UserAnswers'
import QuestionAnswers from '../pages/QuestionAnswers'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/sign-in" exact component={SignIn} />
    <Route path="/sign-up" exact component={SignUp} />
    <Route path="/user-dashboard" exact component={UserDashboard} isPrivate />
    <Route
      path="/questions/:question_id"
      component={AnswerQuestion}
      isPrivate
    />
    <Route path="/admin-dashboard" exact component={AdminDashboard} isPrivate />
    <Route path="/users/:user_id/answers" component={UserAnswers} isPrivate />
    <Route path="/answers/:question_id" component={QuestionAnswers} isPrivate />
  </Switch>
)

export default Routes
