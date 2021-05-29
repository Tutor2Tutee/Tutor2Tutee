import React from "react";
import { Switch,Route } from 'react-router-dom'

import Layout from './../component/Layout/Layout'
import { Home } from './../pages/index'

class App extends React.Component {
    // 라우팅은 여기서 진행
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>
            </Layout>
        );
    }
}

export default App;
