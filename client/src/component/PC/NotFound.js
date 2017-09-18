import React,{Component} from 'react'

class NotFound extends Component{
  render(){
    return(
      <div className = "inner notfound">
        <h1>404</h1>
        <p>You just hit a route that doesn’t exist… the sadness.</p>
        <img alt='google' src = "http://img1.cache.netease.com/catchpic/4/47/47F9D8BDDFD0E45E649862849C4F8CF5.png" />
      </div>
    )
  }
}
export default NotFound
