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
  CreatedClasses,
  AppointedClasses,
  AllClasses,
  SingleClass,
  MyTutor,
  MyTutee,
  NotFound
} from "./../pages/index";

class App extends React.Component {
  // 라우팅은 여기서 진행
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/my_tutor" exact component={MyTutor} />
          <Route path="/my_tutee" exact component={MyTutee} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/quiz/add" exact component={AddQuiz} />
          <Route path="/quiz/:qid" exact component={SingleQuiz} />
          <Route path="/quiz" exact component={QuizList} />
          <Route path="/class/created" exact component={CreatedClasses} />
          <Route path="/class/appointed" exact component={AppointedClasses} />
          <Route path="/class/all" exact component={AllClasses} />
          <Route path="/class/all/:id" exact component={SingleClass} />
          <Route path="/class" exact component={Class} />
          <Route path="/about" exact component={About} />
          <Route path="/feature" exact component={Feature} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
