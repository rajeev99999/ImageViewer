import React,{Component} from 'react';
import './Home.css';
import '../../common/header/Header.css';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header'
import GridList  from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import credentialsData from '../../screens/login/credentials'


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      media: {
        height:600,
        width : 660,
        paddingRight:20,
        paddingLeft:20
      },
    gridListMain:  {
        transform: 'translateZ(0)',
      },
    title: {
        color: theme.palette.primary.light,
    },
    rootCard: {
        maxWidth: 700,
        paddingLeft:50,
        paddingRight:5,
        paddingBottom:20,

    }
});
var imageCaptionMap = new Map();

class Home extends Component{

    constructor(){
        super();
            this.state={
                likesCount:Math.floor(Math.random() * 100),
                date:'',
                postData:[],
                mediaData:{},
                imagesPosted:[],
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
                                sessionStorage.setItem("user-name",that.state.mediaData.username);
                                that.setState({
                                    imageViewData : media,
                                    imagesPosted:media
                                })
                                imageCaptionMap.set(image.id,image.caption);
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

    likeClickHandler =(e)=>{
        let likesId=document.getElementById('likesId');
       let likes_count = likesId.innerHTML
       likes_count = likes_count.trimEnd();
       let parsedLikes = Number.parseInt(likes_count,10);
        parsedLikes+=1;
        likesId.innerHTML=parsedLikes;
        
            
    }

    likeRandomClickHandler = (e) =>{
        let likesId=document.getElementById('likesId');
        let likes_count = likesId.innerHTML
        likes_count = likes_count.trimEnd();
        let parsedLikes = Number.parseInt(likes_count,10);
        parsedLikes+=1;
        likesId.innerHTML=parsedLikes;
    }

    captionFilter = (searchEntry,caption) =>{
        if(caption !== undefined){
            if(caption !== ""){
                let captionlowerCase = caption.toLowerCase();
                searchEntry = searchEntry.toLowerCase();
                return captionlowerCase.includes(searchEntry);
            }
         
        }
    }

    searchBarHandler = (e) =>{
        let searchEntry = e.target.value;
        let result = [];
        if(this.state.imageViewData.length !== 0){
            result= this.state.imageViewData.filter((post) =>  this.captionFilter(searchEntry,imageCaptionMap.get(post.id)));
        }
        else{
            result= this.state.imagesPosted.filter((post) =>  this.captionFilter(searchEntry,imageCaptionMap.get(post.id)));
        }
        if(result.length >0 ){
            this.setState({
                imageViewData:result
            })
        }
         if(searchEntry === ""){
            this.setState({
                imageViewData:this.state.imagesPosted
            })
        }
        if(result.length === 0 && searchEntry !== ""){
            this.setState({
                imageViewData:[]
            })
        }
    }
    
    render(){
        const { classes } = this.props;
        return(
            <div>
                <Header showSearchBar="true" showAvatar="true" searchBarHandler={this.searchBarHandler}/><br/><br/><br/>
                <div className={classes.root}>
                    {sessionStorage.setItem("number-posts",(this.state.imageViewData.length))}
                    <GridList cellHeight={300} cols={2} className={classes.gridListMain}>
                        {this.state.imageViewData.map((post) => (
                           
                            <GridListTile key={post.id} style={{ height: 'auto' }} className="card-tile" >
                            <Card key={post.id} className={classes.rootCard}>
                                <CardHeader
                                    avatar={
                                        <Avatar src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" />
                                    }
                                    title={post.username}
                                    subheader={(post.timestamp)}
                                    
                                 />
                                <CardMedia
                                    className={classes.media}
                                    image={post.media_url} 
                                />
                                <hr/>
                                <CardContent>
                                    <span>
                                {
                                    imageCaptionMap.get(post.id)
                                }
                                
                                </span>
                                <div className="likes-container">
                                {this.state.likesCount===0 ?
                            <IconButton id={post.id} onClick={this.likeClickHandler} > <FavoriteBorderOutlinedIcon className="like-btn"  /></IconButton> :
                              <IconButton onClick={this.likeRandomClickHandler} > <FavoriteIcon className="like-btn" style={{color:'red'}}/> </IconButton> }
                                <span id="likesId" >{Math.floor(Math.random() * 100)} </span><span> likes</span>
                                </div>                           
                                        <div className= "commentBox" >
                
                                      <Input fullWidth={true} key={post.id} type ="text" placeholder="Add a Comment"/>
                                    </div>
                                    <Button variant="contained" color="primary">ADD</Button>
                                        
                                    </CardContent>
                            </Card>
                        </GridListTile>
                            
                        ))}
                    </GridList>
                </div>
                
            </div>
        )
    }
}

export default withStyles(styles)(Home);