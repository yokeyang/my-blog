import React, { Component } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import BlogPage from './BlogPage';
const isPc = () =>{
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
  for ( let i of Agents ){
    if(navigator.userAgent.includes(i)) return false
  }
  return true
}
const styles = theme => ({
  card: {
    width: '100%',
    marginBottom:'2px'
  },
  media: {
    height: 194,
    width:isPc()?'30%':'100%',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  content: {
    display: 'flex',
    flexDirection: isPc()?'row':'column'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    width:60,
    height:60,
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  button: {
    margin: theme.spacing.unit,
  }
});
@withStyles(styles) class Blog extends Component {
  constructor(props){
    super(props)
    this.state = {
      expanded: false
    }
  }
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }
  componentDidMount(){
  }
  render(){
    const props = this.props
    const classes = this.props.classes
    const reg = /(\w|\W)*<\/[^>]+>/
    const regimg = /src="([^"]*)"/
    const imgurl = /<[img\s]+(\w|\W)+>/.exec(decodeURI(this.props.article))
    return(
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {props.author.replace(/[A-Z][^A-Z]+/,'')||props.author}
            </Avatar>
          }
          title={<h3><Link to={`/blog/page${props.id}`}>{props.title}</Link></h3>}
          subheader={this.props.date}
          />
        <CardContent className = {classes.content}>
          <CardMedia
            className={classes.media}
            image={encodeURI(imgurl == null?'':regimg.exec(imgurl[0])[1])}
            title="Contemplative Reptile"
            />
          <Typography component="p" dangerouslySetInnerHTML={{__html: reg.exec(decodeURI(this.props.article).slice(0, 100))[0]}}></Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <Link to = {`/blog/tag/${props.tag1}`}>
            <Button children = {props.tag1} aria-label="tag1" color="accent" className = {classes.button}>
              {props.tag1}
            </Button>
          </Link>
          <Link to = {`/blog/tag/${props.tag2}`}>
            <Button children = "button" aria-label="tag3" color="accent" className = {classes.button}>
              {props.tag2}
            </Button>
          </Link>
          <Link to = {`/blog/tag/${props.tag3}`}>
            <Button children = "button" aria-label="tag3" color="accent" className = {classes.button}>
              {props.tag3}
            </Button>
          </Link>
          <div className={classes.flexGrow} />
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
            children = "IconButton"
            >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
          <CardContent>
            <BlogPage blog = {this.props} />
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}
class BlogPreview extends Component{
  render(){
    const props = this.props
    const blogs = props.blogs
    console.log(blogs)
    return(
      <div className = "inner blogpreview" style = {{marginTop:isPc()?'-10px':'-5px'}}>
        {blogs.map(blogData =>
          <Blog key={blogData.id} {...blogData} />,
        )}
      </div>
    )
  }
}
export default BlogPreview
