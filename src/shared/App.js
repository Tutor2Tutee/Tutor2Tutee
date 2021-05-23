import React from "react";
import {Route, Switch} from 'react-router-dom'
import {Home, About, Class, Login, Register} from "../routes";
import {Header, Footer} from "../components/index.js";
import "./../styles/styles.css"

class App extends React.Component {
    state = {
        token:null
    }
    componentDidMount(){
        const token = localStorage.getItem("t2t-token")
        if(token){
            this.setState({token})
        }
    }
    // 라우팅은 여기서 진행
    render() {
        return (
            <div className="App">
                <Route path={'/'} component={Header} />
                <Route exact path='/' component={Home}/>
                {
                 !this.state.token && <Route path='/user/login' component={Login}/>
                }
                {
                !this.state.token && <Route path='/user/register' component={Register}/>
                }
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

export default App;
