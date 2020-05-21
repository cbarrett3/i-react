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
    this.removeTag = this.removeTag.bind(this)
  }

  // updateTag(event) {
  //   this.setState({tag: event.target.value})
  // }
  addTagtoTags() {
    var tags = this.state.tags
    // var tag = this.state.tag
    // tags = tags.concat(this.state.tag)
    // // tags = tags.map(tag => { 
    // //   return {uid: SomeLibrary.generateUniqueID(), value: item};
    // // });
    // tag = ''
    // this.setState({tags: tags, tag: tag})
    this.setState({ tags : [ this.state.tag, ...this.state.tags], tag: ''})
    // this.setState({tag: ''})
  }

  removeTag(tag) {
    var tags = [...this.state.tags]
    var index = (tags.indexOf(tag))
    tags = tags.slice(0,index).concat(tags.slice(index+1))
    this.setState({tags: tags})
  }

  render() {
    const { content, priv_post, tag, tags } = this.state
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
                    <input id="tag" className="input-reset f5 ba b--white" onChange={e => this.setState({ tag: e.target.value })} type="text" placeholder="Add Tag" id="tag-input" aria-describedby="name-desc" />
                    {tag !== '' && (
                      // <Mutation mutation={CREATE_TAG_MUTATION} variables={{ tag }}>
                      //   {createTagMutation => 
                          <a className="link flex" type="button" href="#0">
                            <h1 className="f6 fw6 ttu tracked green" onClick={() => { this.setState({ tags : [ ...this.state.tags, this.state.tag], tag: ''}); document.getElementById('tag-input').value = ''}}> Add Tag</h1>
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
                  <ul style={{paddingLeft: "0"}}>
                    {tags.map((tag, index) =>
                      <li  style={{listStyleType: "none", display: "inline"}} onClick={() => { this.removeTag(tag)}} key={index}>
                        <a className='f5 link dim br-pill pv2 ph2 mt1 mr1 white bg-green helvetica' href='#0'>
                           <b> x </b> {tag}
                        </a>
                      </li>
                    )}
                  </ul>

                </div>
                <div className="mt3">
                  <Mutation mutation={CREATE_POST_MUTATION} variables={{ content, priv_post }}>
                    {createPostMutation => <a className='f5 link dim b br-pill ph3 pv2 white bg-pink helvetica' href='#0' onClick={createPostMutation}>Post</a>}
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