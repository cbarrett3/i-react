import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import logo_water from '../images/logo-gen2.svg'; 
import { AUTH_TOKEN } from '../constants'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
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
    const { client, loading, error, data } = useQuery(LOGGED_IN_USER);
    if(data) {
        console.log(data.getLoggedInUser.first)
    }
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
        // <Query query={LOGGED_IN_USER}>
            // {({ client, loading, error, data }) => {
                // if (loading) return <div>Fetching</div>
                // if (error) return <div>Error</div>
                // const user = data.getLoggedInUser
                // console.log(user)
                // return (
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
                            {/* <img src={logo} className="mr2" alt="juicelogo"></img> */}
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
                // )
            // }}
        // </Query>
    )
}

export default withRouter(Header)