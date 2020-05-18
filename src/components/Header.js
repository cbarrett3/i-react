import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import logo from '../images/juice-logo.svg'; 
import { AUTH_TOKEN } from '../constants'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

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


class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
        <Query query={LOGGED_IN_USER}>
            {({ client, loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>
                const user = data.getLoggedInUser
                console.log(user)
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
                        <div className="mw-10">
                            <img src={logo} className="mr2" alt="juicelogo"></img>
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
                                    client.resetStore()
                                    this.props.history.push(`/`)
                                }}>
                                logout
                            </div>
                        ): ( 
                            <Link to="/" className="mr3 gray b no-underline">
                                login
                            </Link>
                        )}
                    </div>
                )
            }}
        </Query>
    )
  }
}

export default withRouter(Header)