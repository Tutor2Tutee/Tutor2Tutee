import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./../component/Layout/Layout";
import {
  About,
  Feature,
  Home,
  Login,
  Signup,
  Class,
  SingleQuiz,
  QuizList,
  AddQuiz,
  Dashboard,
} from "./../pages/index";

class App extends React.Component {
  // 라우팅은 여기서 진행
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/quiz/add" exact component={AddQuiz} />
          <Route path="/quiz/:qid" exact component={SingleQuiz} />
          <Route path="/quiz" exact component={QuizList} />
          <Route path="/class" exact component={Class} />
          <Route path="/about" exact component={About} />
          <Route path="/feature" exact component={Feature} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
