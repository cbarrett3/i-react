import React, { Component } from 'react'
import PostList from './PostList'
import CreatePost from './CreatePost'
import QuestionList from './QuestionList'

class Home extends Component {
    render() {
      return (
        <div class="cf">
            <div class="fl w-100 w-25-ns">
                <div class="pa2 bg-light-gray avenir">
                    Posts | Q & A
                </div>
            </div>
            <div class="fl w-100 w-50-ns">
                <div class="outline bg-white pv4">
                <CreatePost></CreatePost>
                <br></br>
                <PostList></PostList>
                <br></br>
                <QuestionList></QuestionList>
                </div>
            </div>
            <div class="fl w-100 w-25-ns dn-m">
                <div class="pa2 bg-light-gray avenir">
                    Followers | Discover
                </div>
            </div>
        </div>
      )
    }
  }

  export default Home