import React, {Component} from 'react';
import Login from '../screens/login/Login';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class Controller extends Component{
    render(){
        return(
            <Router>
                <div className="main-container">
                    <Route exact path='/' render={(props) => <Login  {...props}/>} />
                    
                    <Route path='/home' render={(props) =>  
                    
                        sessionStorage.getItem("loggedIn") === "true" ? <Home  {...props}/> : <Redirect to="/" />
                            } />

                

                    <Route path='/profile' render={(props) =>  
                    sessionStorage.getItem("loggedIn") === "true" ? <Profile {...props}/>: <Redirect to="/" />
                        }
                    />
                </div>
            </Router>
        )
    }
}
export default Controller;