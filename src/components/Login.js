import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { AUTH_TOKEN } from '../constants'
import logo from '../images/juice-logo-white.svg';
import lock from '../images/lock.png';
import earth from '../images/earth.png'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $username: String!, $first: String!, $last: String!, $password: String!) {
    signup(email: $email, username: $username, first: $first, last: $last, password: $password) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    first: '',
    last: '',
    username: '',
    email: '',
    password: ''
  }

  render() {
    const { login, first, last, username, email, password } = this.state
    return (
      <div className="">
        <div className="fl w-100 w-20-ns pt1 dn-m bl bw4 b--pink h5" style={{ borderColor: '#fd5956', height: '100vh' }}>
          <div className="pv4">
            <br></br>
            <img src={lock} alt="lock"></img>
          </div>
        </div>
        <div className="fl w-100 w-60-ns w-100-m br3 bg-pink 5h mt5" style={{ backgroundColor: '#fd5956', minHeight: '75vh' }}>
          <div className="flex items-center justify-center mt3">
            <img src={logo} alt="juicelogo"></img>
          </div>
          <div className="flex flex-column items-center justify-center ph4 mt4">
            {!login && (
              <input
                value={first}
                onChange={e => this.setState({ first: e.target.value })}
                type="text"
                className="pa2 input-reset br3 b-none bg-white w-100 measure mb3"
                placeholder="First Name"
              />
            )}
            {!login && (
              <input
                value={last}
                onChange={e => this.setState({ last: e.target.value })}
                type="text"
                className="pa2 input-reset br3 b-none bg-white w-100 measure mb3"
                placeholder="Last Name"
              />
            )}
            {!login && (
              <input
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                type="email"
                className="pa2 input-reset br3 b-none bg-white w-100 measure mb3"
                placeholder="Email"
              />
            )}
            <input
              value={username}
              onChange={e => this.setState({ username: e.target.value })}
              type="text"
              className="pa2 input-reset br3 b-none bg-white w-100 measure mb3"
              placeholder="Username"
            />
            {login && (
              <input
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                className="pa2 input-reset br3 b-none bg-white w-100 measure mb3"
                placeholder="Password"
              />
            )}
            {!login && (
              <input
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                className="pa2 input-reset br3 b-none bg-white w-100 measure mb3"
                placeholder="Password"
              />
            )}
            {/* {!login && (
              <input
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                className="pa2 input-reset br3 b-none bg-white w-100 measure mb3"
                placeholder="Confirm Password"
              />
            )} */}
          </div>
          <div className="flex flex-column mt3 items-center justify-center">
            <Mutation
              mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
              variables={{ first, last, email, username, password }}
              onCompleted={data => this._confirm(data)}
            >
              {mutation => (
                <div className="pointer mr2 mb2 ph3 pv2 input-reset br3 white grow f6" style={{ backgroundColor: '#3ddf9b'}} onClick={mutation}>
                  {login ? 'Sign In' : 'Create Account'}
                </div>
              )}
            </Mutation>
            <div className="pointer ph3 pv3 input-reset br3 white grow f6" onClick={() => this.setState({ login: !login })}>
              {login && (<div>Need to sign up? <b>Create Account</b></div>)}
              {!login && (<div>Already have an account? <b>Sign In</b></div>)}
            </div>
          </div>
        </div>
        <div className="fl w-100 w-20-ns dn-m br bw4 h5" style={{ color: '#08bbe1', height: '100vh' }}>
          <img src={earth} alt="earth" style={{ marginTop: '50vh' }}></img>
        </div>
      </div>
    )
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push(`/home`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login