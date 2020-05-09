import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import juice from '../images/watermelon.svg'; 



class Header extends Component {
  render() {
    return (
      <div className="flex f4 justify-around nowrap gray helvetica">
        <Link to="/" className="App-logo mr3 mt3 b no-underline pink">
            home
            {/* <img src={home} class="mr2" alt="juicelogo"></img> */}
        </Link>
        <div className="fw7 mr2 mt3">
            profile
        </div>
        <div class="mw-10">
            <img src={juice} class="mr2 mt2" alt="juicelogo"></img>
        </div>
        <div className="fw7 mr2 mt3">
            notifications
        </div>
        <div className="fw7 mt3">
            more
        </div>
      </div>
    )
  }
}

export default withRouter(Header)