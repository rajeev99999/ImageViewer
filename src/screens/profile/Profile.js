import React, {Component} from 'react';
import './Profile.css';
import { withStyles } from '@material-ui/core/styles';
import '../../common/header/Header';
import Header from '../../common/header/Header';
import credentialsData from '../../screens/login/credentials'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from 'react-modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from "@material-ui/core/Typography";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width:'60%',
        transform: 'translate(-50%, -50%)'
    }
};

const customStylesForDesc = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width:'12%',
        transform: 'translate(-50%, -50%)'
    }
};

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      media: {
        
        height:480,
        width : 500,
        marginLeft:50
      },
      mediaCard:{
        height:500,
        float: 'left',
    width: 'calc(58.333% - 1rem)',
    display: 'flex'
      },
    gridListMain:  {

         transform: 'translateZ(0)',
      },
    title: {
        color: theme.palette.primary.light,
    },
    
});


class Profile extends Component{

    constructor(){
        super();
            this.state={
                modalIsOpen:false,
                description:'',
                fullName:'',
                editModalIsOpen :false,
                value: 0,
                mediaUrl:'',
                postData:[],
                mediaData:{},
                imageViewData:[]
        }
    }

    componentWillMount(){


        credentialsData.forEach((credentials)=>{
        let accessToken= sessionStorage.getItem("access-token");
            let data = null;
            let xhr = new XMLHttpRequest();    
            let that = this;
            let media = [];
            let baseUrl = "https://graph.instagram.com/me/media?fields=id,caption&access_token="
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4 && this.status === 200) {
                    that.setState({
                        postData: JSON.parse(this.responseText).data
                        
                    });
                    let imageData = that.state.postData;
                    imageData.forEach((image)=>{
                        let xhtmldata = null;
                        let xhrReq = new XMLHttpRequest();    
                        let baseUrl1 = "https://graph.instagram.com/"
                        let baseUrl2 = "?fields=id,media_type,media_url,username,timestamp&access_token="
                        xhrReq.addEventListener("readystatechange", function () {
                            if (this.readyState === 4 && this.status === 200) {
                                that.setState({
                                    mediaData: JSON.parse(this.responseText)
                                });
                               
                                media.push(that.state.mediaData);
                                that.setState({
                                    imageViewData : media
                                })
                                
                            }
            });
            xhrReq.open("GET", baseUrl1 + image.id +baseUrl2 + accessToken);
            xhrReq.setRequestHeader("Cache-Control", "no-cache");
            xhrReq.send(xhtmldata);
                    })
                    
                }
            });
            xhr.open("GET", baseUrl + accessToken);
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.send(data);

        })
    }

    openModalHandler = (e)=>{
        this.setState({
            mediaUrl:e.target.src,
            modalIsOpen:true
        });
    }

    closeModalHandler =() =>{
        this.setState({ modalIsOpen: false });
    }

    closeEditModalHandler =() =>{
        this.setState({ editModalIsOpen: false });
    }

    descriptionHandler = () => {
        this.setState({
            editModalIsOpen:true
        })

    }

    inputChangeHandler = (event) =>{
        this.setState({
            description: event.target.value
        })
    }
    updateNameHandler =(event) =>{
        this.setState({
            fullName:this.state.description,
            editModalIsOpen:false
        })
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Header showSearchBar="false" showAvatar="true" /><br/>

                <div className="container">
                    <div className="profile">
                        <div className="profile-image">
                            <img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt="user-pic"/>
                        </div>
                        <div className="profile-user">
                            <h1 className="profile-user-name">{sessionStorage.getItem("user-name")}</h1>
                        </div>
                        <div className="profile-stats">
                            <ul>
                                <li><span className="profile-stat-count">{sessionStorage.getItem("number-posts")} </span>posts</li>
                                <li><span className="profile-stat-count">33 </span>followers</li>
                                <li><span className="profile-stat-count">22 </span>followed by</li>
                            </ul>
                        </div>
                        <div className="profile-bio">
                            <span id ="full-name" className="profile-desc">{this.state.fullName ===""?"Upgrad Education":this.state.fullName} &nbsp;</span>
                            <Button variant="contained" color="secondary" onClick={this.descriptionHandler}><EditRoundedIcon/></Button>
                        </div>
                    </div>
                </div>

                <GridList cellHeight={200} cols={3} className={classes.gridListMain}>
                        {this.state.imageViewData.map((post) => (
                            <GridListTile key={post.id} style={{ height: 'auto' }} className="card-tile" >
                                <img className={classes.media}  src={post.media_url} alt="user-pic" onClick={this.openModalHandler}/>
                            
                    
                            </GridListTile>
                            ))}
                     
                     <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="ImageModal"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                    >

                <div className="modal-image-container">
                   <img src={this.state.mediaUrl} className={classes.mediaCard} alt="user-pic"/>
                   <Card className="card-post">
                                <CardHeader
                                    avatar={
                                        <Avatar src="https://m.economictimes.com/thumb/msid-74702807,width-1200,height-900,resizemode-4,imgsize-613563/narendramodi-pti.jpg" />
                                    }
                                    title={sessionStorage.getItem("user-name")}
                                    
                                 />
                                
                                <hr/><br/><br/><br/><br/><br/><br/>
                                <br/><br/><br/><br/><br/><br/><br/>
                                <CardContent>
                                <div className="likes-container">
                                {this.state.likesCount===0 ?
                            <IconButton  onClick={this.likeClickHandler} > <FavoriteBorderOutlinedIcon className="like-btn"  /></IconButton> :
                              <IconButton onClick={this.likeRandomClickHandler} > <FavoriteIcon className="like-btn" style={{color:'red'}}/> </IconButton> }
                                <span id="likesId" >{Math.floor(Math.random() * 100)} </span><span> likes</span>
                                </div>                           
                                        <div className= "commentBox" >
                
                                      <Input fullWidth={false} id="comment-box" type ="text" placeholder="Add a Comment"/>
                                      <Button  variant="contained" color="primary">ADD</Button>
                                     
                                     </div> 
                                        
                                    </CardContent>
                            </Card>

                </div>
                   </Modal>
                </GridList>
               <Modal
                    ariaHideApp={false}
                    isOpen={this.state.editModalIsOpen}
                    contentLabel="DescModal"
                    onRequestClose={this.closeEditModalHandler}
                    style={customStylesForDesc}
                    >
                        <Typography component="h1">
                            <p style={{fontSize:20}}>EDIT</p>
                        </Typography>
                             <FormControl required>
                                <InputLabel htmlFor="edit-name">Full Name</InputLabel>
                                <Input id="edit-name" type="text" description={this.state.description} onChange={this.inputChangeHandler}/><br/><br/>
                        <Button size="small" style={{width:'40%'}} variant="contained" color="primary" onClick={this.updateNameHandler}>UPDATE</Button>
                                
                            </FormControl>                       
                    </Modal>
                
            </div>
        )
    }
}

export default withStyles(styles)(Profile);