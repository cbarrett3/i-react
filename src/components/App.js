import React, { Component } from 'react'
import Home from './Home'
import Login from './Login'
import Header from './Header'
import Footer from './Footer'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      // <div className="center w85">
      //   <Header />
      //   <div className="pa1">
      //     <Switch>
      //       <Route exact path="/home" component={Home} />
      //       <Route exact path="/login" component={Login} />
      //     </Switch>
      //   </div>
      //   <Footer/>
      // </div >
      <div className="center" style={{width: "90%"}}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route component={Header} />
          <Footer></Footer>
        </Switch>
        <Route exact path="/home" component={Home} />
        {/* <Route exact path="/login" component={Login} /> */}
      </div >
    )
  }
}

export default App