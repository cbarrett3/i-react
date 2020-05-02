import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div className="flex pa3 f5 justify-between nowrap gray avenir">
        <div className="flex flex-fixed">
          <Link to="/" className="ml1 no-underline pink">
            home
          </Link>
        </div>
        <div className="fw7 mr1">
            me
        </div>
        <div className="fw7 f4 mr1 green">
            The Juice
        </div>
        <div className="fw7 mr1">
            notifications
        </div>
        <div className="fw7 mr1">
            more
        </div>
      </div>
    )
  }
}

export default withRouter(Header)