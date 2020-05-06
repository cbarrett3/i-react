import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div className="flex pv3 f4 justify-between nowrap gray avenir">
        <div className="fw7 f4 mr3 green">
            The Juice
        </div>
        <div className="flex">
            <Link to="/" className="mr3 b no-underline pink">
                Home
            </Link>
            <div className="fw7 mr3">
                Profile
            </div>
            <div className="fw7 mr3">
                Notifications
            </div>
            <div className="fw7 mr3">
                More
            </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)