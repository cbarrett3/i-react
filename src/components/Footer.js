import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Footer extends Component {
  render() {
    return (
        <footer className="w-30 pt2 pb4 mid-gray helvetica">
            <small className="f6 db tc">© 2020 <b className="ttu">Hear Me Out</b>. All Rights Reserved.</small>
            <div className="tc mt2">
                <a href="/language/" title="Language" className="f6 dib ph2 link mid-gray dim">Language</a>
                <a href="/terms/"    title="Terms" className="f6 dib ph2 link mid-gray dim">Terms of Use</a>
                <a href="/privacy/"  title="Privacy" className="f6 dib ph2 link mid-gray dim">Privacy</a>
            </div>
        </footer>
    )
  }
}

export default withRouter(Footer)