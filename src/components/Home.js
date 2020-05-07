import React, { Component } from 'react'
import PostList from './PostList'
import CreatePost from './CreatePost'
import QuestionList from './QuestionList'

class Home extends Component {
    render() {
      return (
        <div class="cf">
            <div class="fl w-100 w-25-ns br3 bg-light-gray">
                <div class="pa1 tc avenir">
                    <a class="f5 link dim br-pill pr4 pr2-m pv1 dib gray bg-light-gray" href="#0">Q & A</a>
                    <a class="f5 link dim br-pill pv1 dib green bg-light-gray b" href="#0"> Posts </a>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            <div class="fl w-100 w-50-ns w-75-m">
                <div class="bg-white">
                    <CreatePost></CreatePost>
                    <br/>
                    <PostList></PostList>
                    <br/>
                    <QuestionList></QuestionList>
                </div>
            </div>
            <div class="fl w-100 w-25-ns br3 dn-m bg-light-gray">
                <div class="pa1 tc avenir">
                    <a class="f5 link dim br-pill pr4 pv1 dib green bg-light-gray b" href="#0">Followers</a>
                    <a class="f5 link dim br-pill pv1 dib gray bg-light-gray" href="#0">Discover</a>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        </div>
      )
    }
  }

  export default Home