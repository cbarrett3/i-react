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

const CREATE_TAG_MUTATION = gql`
  mutation CreateTagMutation($tag: String!) {
    createTag(tag: $tag) {
      id
      tag                                     
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
      tag: '',
      tags: []
    }
    this.addTagtoTags = this.addTagtoTags.bind(this)
  }

  // updateTag(event) {
  //   this.setState({tag: event.target.value})
  // }
  addTagtoTags() {
    console.log(this.state.tag)
    var tags = this.state.tags
    tags = tags.concat(this.state.tag)
    console.log(tags)
    this.setState({tags: tags})
  }

  render() {
    const { content, priv_post, tag, tags } = this.state
    console.log(tags)
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
                <div className="">
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
                <div className="">
                    <input id="tag" className="input-reset f5 ba b--white" onChange={e => this.setState({ tag: e.target.value })} type="text" placeholder="Add Tag" aria-describedby="name-desc" />
                    {tag !== '' && (
                      // <Mutation mutation={CREATE_TAG_MUTATION} variables={{ tag }}>
                      //   {createTagMutation => 
                          <a className="link flex" type="button" href="#0">
                            <h1 className="f6 fw6 ttu tracked green" onClick={this.addTagtoTags}>Add Tag</h1>
                          </a>
                      // </Mutation>
                    )}
                </div>
                <div>
                  <label className="">
                    <select className="select-css" onChange={e => this.setState({ priv_post: e.target.value })}>
                      <option defaultValue priv_post="false">Public</option>
                      <option priv_post="true">Private </option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="" id="tags">
                {/* <div className="tl">
                                {postsToRender.map(post => <Post key={post.id} post={post} />)}
                            </div> */}
                  {tags.map(tag =>
                    <a className='f6 link dim br-pill pv2 ph2 mt1 mr1 dib white bg-green helvetica' href='#0'>
                      <b>x </b>
                      {tag}
                    </a>
                  )}

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