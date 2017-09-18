import React, { Component } from 'react';
import {IconButton} from 'material-ui';
import FaGithub from 'react-icons/lib/fa/github';
import FaWechat from 'react-icons/lib/fa/wechat';
import Tooltip from 'material-ui/Tooltip';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Routers from './component/router';
import Footer from './component/PC/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className = "Home">
          <header className="site-header">
            <div className="inner">
              <div className = "site-name-content">
                <h1 className="site-name">YokeYang</h1>
                <h4 className="site-name">一個小學生</h4>
              </div>
              <nav className="site-nav">
                <ul className = "Tableft">
                  <li><Link to="/">主頁</Link></li>
                  <li><Link to="/about">關於</Link></li>
                  <li><Link to="post">發佈</Link></li>
                </ul>
                <ul className = "TabRight">
                  <IconButton aria-label="github" href = "https://github.com/yokeyang">
                    <FaGithub />
                  </IconButton>
                  <Tooltip label="13098878963" placement="bottom">
                    <IconButton aria-label="wechat" href = "#">
                      <FaWechat />
                    </IconButton>
                  </Tooltip>
                </ul>
              </nav>
            </div>
          </header>
          <div className="contents">
            <Routers />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
