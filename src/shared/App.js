import React from "react";
import {Route, Switch} from 'react-router-dom'
import {Home, About, Class} from "../routes";

class App extends React.Component {
    // 라우팅은 여기서 진행
    render() {
        return (
            <div className="App">
                <Route exact path='/' component={Home}/>
                <Switch>
                    <Route path={'/about/:name'} component={About}/>
                    <Route path='/about' component={About}/>
                </Switch>
                <Route path={'/class'} component={Class} />
            </div>
        );
    }
}

export default App;
