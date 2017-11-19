import React from 'react';
import { Route, Switch} from 'react-router';
import $ from 'jquery';
import BlogPreview from './PC/BlogPreview';
import BlogPage from './PC/BlogPage';
import MyEditor from './PC/Post';
import About from './PC/About';
import NotFound from './PC/NotFound';

const Routers = ({ match, location, history }) => {
  var blogs
  (function(){
    $.ajax({
      url: '/select/',
      type: 'GET',
      dataType: 'json',
      async:false
    })
    .done(function(res) {
      blogs = res.result
    })
    .fail(function() {
      console.log("error");
  })})()
  const renderBlogPage = ({match}) =>(
    <BlogPage blog = {blogs.find(current => current.id == match.params.id)} />
  )
  const renderTag = ({match}) =>(
    <BlogPreview blogs = {blogs.filter(current => (current.tag1 === match.params.tag||current.tag2 === match.params.tag||current.tag3 === match.params.tag))} />
  )
  const renderAuthor = ({match}) =>(
    <BlogPreview blogs = {blogs.filter(current => (current.author === match.params.author))} />
  )
  return(
    <Switch>
      <Route exact path="/" render= {() =><BlogPreview blogs = {blogs} />} />
      <Route exact path="/about" render= {() =><About />} />
      <Route exact path="/blog/page:id" render= {renderBlogPage} />
      <Route exact path="/blog/tag/:tag" render= {renderTag} />
      <Route exact path="/blog/author/:author" render= {renderAuthor} />
      <Route exact path="/post" render= {() =><MyEditor />} />
      <Route component={NotFound} />
    </Switch>
  )
}
export default Routers
