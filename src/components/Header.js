import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import logo_water from '../assets/logo-gen2.svg'; 
import { AUTH_TOKEN } from '../constants'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';
import "../styles/Header.css"

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
        // <div className="flex f3 mt3 justify-around nowrap gray helvetica fixed">
        //     {authToken && (
        //         <Link to="/home" className="App-logo mr3 b no-underline pink dim" style={{color: '#fd5956'}}>
        //             Home
        //         </Link>
        //     )}
        //     {authToken && (
        //         <div className="fw7 mr2 dim" style={{cursor: "pointer"}}>
        //             Profile
        //         </div>
        //     )}
        //     <div className="mw-10">
        //         <img src={logo_water} className="mr2" style={{cursor: "pointer"}} alt="juicelogo"></img>
        //     </div>
        //     {authToken && (
        //         <div className="fw7 mr2">
        //             {/* messages */}
        //         </div>
        //     )}
        //     {authToken ? (
        //         <div
        //             className="fw7 dim"
        //             style={{cursor: "pointer"}}
        //             onClick={() => {
        //                 localStorage.removeItem(AUTH_TOKEN)
        //                 client.resetStore()
        //                 props.history.push(`/`)
        //             }}>
        //             Settings
        //         </div>
        //     ): ( 
        //         <Link to="/" className="mr3 gray b no-underline dim">
        //             login
        //         </Link>
        //     )}
        // </div>



        // <header className="headerArea fixed">
        //     <nav className="items w-100 tl b fixed">
        //         <div className="w-75">
        //             {authToken && (
        //                 <a className="link dim dib mr3" href="#0" title="Home">
        //                         <Link to="/home" className="home b no-underline">
        //                             Home
        //                         </Link>
        //                 </a>
        //             )}
        //             {authToken && (
        //                 <a className="item link dim dib mr3 pointer" href="#0" title="About">
        //                     <div>
        //                         Profile
        //                     </div>
        //                 </a>
        //             )}
        //             {authToken ? (
        //                 <div
        //                     className="item link dim dib mr3 pointer"
        //                     onClick={() => {
        //                         localStorage.removeItem(AUTH_TOKEN)
        //                         client.resetStore()
        //                         props.history.push(`/`)
        //                     }}>
        //                     Log Out
        //                 </div>
        //             ): ( 
        //                 <Link to="/" className="mr3 gray b no-underline dim">
        //                     Log In
        //                 </Link>
        //             )}
        //         </div>
        //         <div className="w-2 tr">
        //             {authToken && (
        //                 <a className="settingsLink link dim" href="#0" title="Home">
        //                         <Link to="/settings" className="settings b no-underline">
        //                             Settings
        //                         </Link>
        //                 </a>
        //             )}
        //         </div>
        //     </nav>
        // </header>

        <nav class="headerArea dt w-100 border-box pa2 fixed bg-white">
            <a class="dtc black link dim w-15" href="#0" title="Home">
                {/* <img src="http://tachyons.io/img/logo.jpg" class="dib w2 h2 br-100" alt="Site Name"/> */}
                logo here
            </a>
            <div class="dtc v-mid w-85 tr">
                {authToken && (
                    <a className="link dim dib mr3 mr4-ns f5 f4-ns" href="#0" title="Home">
                            <Link to="/home" className="home b no-underline">
                                Home
                            </Link>
                    </a>
                )}
                {authToken && (
                    <a className="link dim dib mr3 mr4-ns f5 f4-ns black b pointer" href="#0" title="About">
                            Profile
                    </a>
                )}
                {authToken ? (
                    <div
                        className="logout link dim dib mr4-l f5 f4-ns black b pointer"
                        onClick={() => {
                            localStorage.removeItem(AUTH_TOKEN)
                            client.resetStore()
                            props.history.push(`/`)
                        }}>
                        Log Out
                    </div>
                    ): ( 
                    <Link to="/" className="link dim dib mr3 mr4-ns f5 f4-ns black b pointer">
                        Log In
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default withRouter(Header)