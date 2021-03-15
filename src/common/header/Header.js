import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

class Header extends Component {

    constructor(){
        super();
        this.state={
            anchorEl:null
        }
    }
    profileClickHandler = (event) =>{
        this.setState({
            anchorEl:event.currentTarget
        })
    }

    onHandleClose = (event) =>{
        this.setState({
            anchorEl:null
        })     
    }
    onLogout = (event) => {
        sessionStorage.removeItem("number-posts");
        sessionStorage.removeItem("access-token");
        sessionStorage.removeItem("loggedIn");
        this.setState({
            anchorEl:null
        })   
    }

    

    render() {
        return (
            <header className="app-header">
                <span className="app-logo-heading">Image Viewer</span>
            { 
                    this.props.showAvatar === "true"?
                    <div>
                     <Avatar className="avatar-icon" src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces"
                     alt="user" onClick={this.profileClickHandler}/> 
                     <Paper>
                     <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.onHandleClose}
                    >
                    <MenuItem 
                    onClick={this.onHandleClose} ><Link className="popper" to="/profile">My account</Link></MenuItem>
                    <MenuItem onClick={this.onLogout}><Link className="popper" to="/home">Logout</Link></MenuItem>
                    </Menu></Paper>            
                        </div>
                        : ""
                    }


                    {this.props.showSearchBar === "true" ?
                    <TextField className="search-box" 
                    type="search"
                    variant="outlined"
                    margin="normal"
                    size="small"
                    onChange={this.props.searchBarHandler}
                    placeholder="Search..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />                      
                        :""
                    }


            </header>

        )
    }
}

export default Header;