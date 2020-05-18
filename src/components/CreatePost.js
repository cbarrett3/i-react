import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/CreatePost.css';

const CREATE_POST_MUTATION = gql`
  mutation PostMutation($content: String!, $priv_post: Boolean) {
    createPost(content: $content, priv_post: $priv_post) {
      id
      content
      priv_post
    }
  }
`

const LOGGED_IN_USER = gql`
  {
    getLoggedInUser {
      id
      first
      last
      username
      profile_pic_url
    }
  }
`

class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      priv_post: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ priv_post: event.target.value });
  }

  handleSubmit(event) {
    alert('Your privacy selection for this post was: ' + this.state.priv_post);
    event.preventDefault();
  }

  render() {
    const { content, priv_post } = this.state
    return (
      <Query query={LOGGED_IN_USER}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
          const user = data.getLoggedInUser
          return (
            <div className="flex flex-column ph3 mb1 helvetica">
              <div className="flex mb2">
                <img
                  src="http://tachyons.io/img/logo.jpg"
                  className="br-pill h2-m w2-m h2 w2 mt1 mr1" alt="avatar">
                </img>
                <div className="lh-copy">
                  <span className="f5 db b black mh2">{user.first} {user.last}</span>
                  <span className="f6 db gray mh2">@{user.username}</span>
                </div>
                <textarea
                  id="post"
                  name="post"
                  value={this.state.content}
                  placeholder="What's good?"
                  onChange={e => this.setState({ content: e.target.value })}
                  className="db f4 hover-black w-60 measure ba b--white ph2"
                  aria-describedby="post-content">
                </textarea>
              </div>
              <div className="flex justify-between">
                <div className="measure ph2">
                  <input id="name" className="input-reset w-100 f5 ba b--white" type="text" placeholder="Add Tags" aria-describedby="name-desc" />
                </div>
                <label>
                  <select className="select-css" onChange={this.handleChange}>
                    <option defaultValue priv_post="false">Public</option>
                    <option priv_post="true">Private </option>
                  </select>
                </label>
              </div>
              <div className="flex justify-between">
                <div>
                  <a className='f6 link dim br-pill pv2 ph2 ma1 dib white bg-green helvetica' href='#0'>
                    <b>x </b>
                    Added Tag
                  </a>
                </div>
                <div className="mt3">
                  <Mutation mutation={CREATE_POST_MUTATION} variables={{ content, priv_post }}>
                    {createPostMutation => <a className='f5 link dim br-pill ph3 pv2 white bg-pink helvetica' href='#0' onClick={createPostMutation}>Post</a>}
                  </Mutation>
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default CreatePost