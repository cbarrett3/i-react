import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import logo from '../images/juice-logo.svg'; 
import { AUTH_TOKEN } from '../constants'


class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
        <div className="flex f4 mt3 justify-around nowrap gray helvetica">
            {authToken && (
                <Link to="/home" className="App-logo mr3 b no-underline pink">
                    home
                </Link>
            )}
            {authToken && (
                <div className="fw7 mr2">
                    profile
                </div>
            )}
            <div class="mw-10">
                <img src={logo} class="mr2" alt="juicelogo"></img>
            </div>
            {authToken && (
                <div className="fw7 mr2">
                    notifications
                </div>
            )}
            {authToken ? (
                <div 
                    className="fw7"
                    onClick={() => {
                        localStorage.removeItem(AUTH_TOKEN)
                        this.props.history.push(`/`)
                    }}>
                    logout
                </div>
            ): ( 
                <Link to="/login" className="mr3 gray b no-underline">
                    login
                </Link>
            )}
        </div>
    )
  }
}

export default withRouter(Header)