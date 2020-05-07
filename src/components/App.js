import React, { Component } from 'react'
import PostList from './PostList'
import Home from './Home'
import Header from './Header'
import Footer from './Footer'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="pa1">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
        <Footer/>
      </div >
    )
  }
}

export default App