import React from "react";
import {Route, Switch} from 'react-router-dom'
import {Home, About, Class, Login, Register,Dashboard} from "../routes";
import {Header, Footer} from "../components/index.js";
import "./../styles/styles.css"
import * as actionCreators from './../store/actions/auth'
import { connect } from "react-redux";

class App extends React.Component {
    componentDidMount(){
        const token = localStorage.getItem("t2t-token")
        if(token){
            this.props.onAuthenticated(token)
        }
    }
    // 라우팅은 여기서 진행
    render() {
        return (
            <div className="App">
                <Route path={'/'} component={Header} />
                <Route exact path='/' component={Home}/>
                <Route exact path='/user/dashboard' component={Dashboard}/>
                <Route path='/user/login' component={Login}/>
                <Route path='/user/register' component={Register}/>
                <Switch>
                    <Route path={'/about/:name'} component={About}/>
                    <Route path='/about' component={About}/>
                </Switch>
                <Route path={'/class'} component={Class} />
                <Route path={'/'} component={Footer}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticated:(token) => dispatch(actionCreators.authChecker(token))
    }
}

export default connect(null, mapDispatchToProps)(App);
