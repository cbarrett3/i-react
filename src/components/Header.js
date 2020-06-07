import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import logo_water from '../assets/logo-gen2.svg'; 
import { AUTH_TOKEN } from '../constants'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';

const LOGGED_IN_USER = gql`
  {
    getLoggedInUser {
      id
      first
      last
      username
    }
  }
`

function Header(props) {
    const { client } = useQuery(LOGGED_IN_USER);
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
        <div className="flex f3 mt3 justify-around nowrap gray helvetica">
            {authToken && (
                <Link to="/home" className="App-logo mr3 b no-underline pink dim" style={{color: '#fd5956'}}>
                    Home
                </Link>
            )}
            {authToken && (
                <div className="fw7 mr2 dim" style={{cursor: "pointer"}}>
                    Profile
                </div>
            )}
            <div className="mw-10">
                <img src={logo_water} className="mr2" style={{cursor: "pointer"}} alt="juicelogo"></img>
            </div>
            {authToken && (
                <div className="fw7 mr2">
                    {/* messages */}
                </div>
            )}
            {authToken ? (
                <div
                    className="fw7 dim"
                    style={{cursor: "pointer"}}
                    onClick={() => {
                        localStorage.removeItem(AUTH_TOKEN)
                        client.resetStore()
                        props.history.push(`/`)
                    }}>
                    Settings
                </div>
            ): ( 
                <Link to="/" className="mr3 gray b no-underline dim">
                    login
                </Link>
            )}
        </div>
    )
}

export default withRouter(Header)