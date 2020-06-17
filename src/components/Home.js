import React, { Component } from 'react'
import PostList from './PostList'
import CreatePost from './CreatePost'
import Footer from './Footer'

class Home extends Component {
    render() {
      return (
        <div className="cf">
            <div className="fl w-100 w-25-ns br3 bg-light-gray" style={{backgroundColor: "#f2f5f4", marginTop: "4em"}}>
                <div className="pa1 tc helvetica">
                    <a className="f5 link dim br-pill pr4 pr2-m pv1 dib gray bg-light-gray" style={{backgroundColor: "#f2f5f4"}} href="#0">Q & A</a>
                    <a className="f5 link dim br-pill pv1 dib green bg-light-gray b" style={{backgroundColor: "#f2f5f4"}} href="#0"> Posts </a>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            <div className="fl w-100 w-50-ns w-75-m" style={{marginTop: "4em"}}>
                <div className="bg-white">
                    <CreatePost></CreatePost>
                    <br/>
                    <PostList></PostList>
                    <br/>
                    {/* <QuestionList></QuestionList> */}
                </div>
                {/* <Footer></Footer> */}
            </div>
            <div className="fl w-100 w-25-ns br3 dn-m bg-light-gray" style={{backgroundColor: "#f2f5f4", marginTop: "4em"}}>
                <div className="pa1 tc helvetica">
                    <a className="f5 link dim br-pill pr4 pv1 dib green bg-light-gray b" style={{backgroundColor: "#f2f5f4"}} href="#0">Followers</a>
                    <a className="f5 link dim br-pill pv1 dib gray bg-light-gray" style={{backgroundColor: "#f2f5f4"}} href="#0">Discover</a>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        </div>
        )
    }
  }

  export default Home