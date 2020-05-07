import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import juice from '../images/JUICE-LOGO.svg'; // with import



class Header extends Component {
  render() {
    return (
      <div className="flex pv2 f4 justify-between nowrap gray helvetica">
        <div class="mw-10">
            <img src={juice} class="mr2" alt="juicelogo"></img>
        </div>
        {/* <div className="fw7 mr2 green">
            The Juice
        </div> */}
        <div className="flex">
            <Link to="/" className="mr3 b no-underline pink">
                Home
            </Link>
            <div className="fw7 mr2">
                Profile
            </div>
            <div className="fw7 mr2">
                Notifications
            </div>
            <div className="fw7">
                More
            </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)