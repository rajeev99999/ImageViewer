import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import "./Login.css";
import Header from '../../common/header/Header'
import credentialsData from './credentials'

class Login extends Component{
    constructor(){
        super();
        this.state={
            username: "",
            usernameRequired:"dispNone",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
        }
    }

    loginClickHandler =() => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" }); 
        credentialsData.forEach((credentials)=>{
        if(this.state.username === credentials.username && this.state.loginPassword === credentials.password ){
            let accessToken= credentials.access_token;
             sessionStorage.setItem("access-token",accessToken); 
             sessionStorage.setItem("loggedIn",true);
            this.props.history.push({
                pathname: '/home'
            })
        }
       

    })
    }
    
    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }
    render(){
        return(
            <div>
                <Header />
                <Card className="cardStyle">
                    <CardContent>
                        <Typography component="h1">
                            <b>LOGIN</b>
                        </Typography><br/>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input className="tabs" id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler}/>
                            <FormHelperText className={this.state.usernameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br/>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input className="tabs" id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler}/>
                            <FormHelperText className={this.state.loginPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br/><br/>
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Login;