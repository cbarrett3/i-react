import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import juice from '../images/watermelon.svg'; // with import
import home from '../images/home.svg'; // with import



class Header extends Component {
  render() {
    return (
      <div className="flex f4 mt3 justify-around nowrap gray helvetica">
        <Link to="/" className="mr3 b no-underline pink">
            home
            {/* <img src={home} class="mr2" alt="juicelogo"></img> */}
        </Link>
        <div className="fw7 mr2">
            profile
        </div>
        <div class="mw-10">
            <img src={juice} class="mr2" alt="juicelogo"></img>
        </div>
        <div className="fw7 mr2">
            notifications
        </div>
        <div className="fw7">
            more
        </div>
      </div>
    )
  }
}

export default withRouter(Header)