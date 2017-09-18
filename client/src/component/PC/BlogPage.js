import React,{Component} from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'

class BlogPage extends Component{
  render(){
    const {blog} = this.props
    return(
      <div className = "inner BlogPage">
        <btitle className = "BlogTitle">{blog.title}</btitle>
        <btime className = "BlogTime">{blog.date}</btime>
        <btag className = "BlogTag">
          <tag><Link to = {`/blog/tag/${blog.tag1}`}>{blog.tag1}</Link></tag>
          <tag><Link to = {`/blog/tag/${blog.tag2}`}>{blog.tag2}</Link></tag>
          <tag><Link to = {`/blog/tag/${blog.tag3}`}>{blog.tag3}</Link></tag>
        </btag>
        <bcontent className = "BlogContent" dangerouslySetInnerHTML={{__html: decodeURI(blog.article)}}></bcontent>
        <bfooter>
          <bauthor className = "BlogAuthor">作者：<Link to = {`/blog/author/${blog.author}`}>{blog.author}</Link></bauthor>
        </bfooter>
      </div>
    )
  }
}
export default BlogPage
