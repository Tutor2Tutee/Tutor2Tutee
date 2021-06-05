import React from "react";
import { Switch,Route } from 'react-router-dom'

import Layout from './../component/Layout/Layout'
import { About, Feature, Home,Login, Signup,Class } from './../pages/index'

class App extends React.Component {
    // 라우팅은 여기서 진행
    render() {
        return (
            <Layout>
                <Switch>
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
