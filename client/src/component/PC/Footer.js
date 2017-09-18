import React,{Component} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';

class Footer extends Component {
  render(){
    return(
      <div className = "footer">
        <div className = "inner">
          <h5><Link to = "/">YokeYang's Blog© 2017</Link></h5>
          <p>Thanks <a href = "itjesse.cn">itjesse'blog</a></p>
        </div>
      </div>
    )
  }
}
export default Footer;
