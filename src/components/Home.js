import React, { Component } from 'react'
import PostList from './PostList'
import CreatePost from './CreatePost'
import Footer from './Footer'
import "../styles/Home.css"

class Home extends Component {
    render() {
      return (
        <div className="home cf">
            <div className="fl w-25-ns dn-m br4" style={{marginTop: "5em"}}>
                <div className="fixed pa1 tc br4" style={{backgroundColor: "#f7f8fc", minHeight: "70%", width: "22%"}}>
                    <a className="link dim br-pill pr4 pr2-m pv1 dib gray bg-light-gray" style={{backgroundColor: "#f7f8fc"}} href="#0">Q & A</a>
                    <a className="link dim br-pill pv1 dib green bg-light-gray b" style={{backgroundColor: "#f7f8fc", color: "#437FC7"}} href="#0"> Posts </a>
                </div>
            </div>
            <div className="fl w-50-ns w-100-m" style={{marginTop: "2.7em"}}>
                <div className="bg-white">
                    <CreatePost></CreatePost>
                    <br/>
                    <PostList></PostList>
                    <br/>
                    {/* <QuestionList></QuestionList> */}
                </div>
                <Footer></Footer>
            </div>
            {/* <div className="siders fl w-25-ns br4 dn-m bg-light-gray" style={{backgroundColor: "#f7f8fc", marginTop: "4em"}}>
                <div className="pa1 tc">
                    <a className="followers link dim br-pill pr4 pr2-m pv1 dib gray" href="#0">Followers </a>
                    <a className="link dim br-pill pv1 dib green bg-light-gray b" style={{backgroundColor: "#f7f8fc", color: "#437FC7"}} href="#0"> Discover </a>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div> */}
            <div className="relative fl w-25-ns dn-m br4 db" style={{marginTop: "5em"}}>
                <div className="rightSiders fixed pa1 tc br4" style={{backgroundColor: "#f7f8fc", minHeight: "70%", width: "22%"}}>
                    <a className="link dim br-pill pr4 pr2-m pv1 dib gray bg-light-gray" style={{backgroundColor: "#f7f8fc"}} href="#0">Followers</a>
                    <a className="link dim br-pill pv1 dib green bg-light-gray b" style={{backgroundColor: "#f7f8fc", color: "#437FC7"}} href="#0">Discover</a>
                </div>
            </div>
        </div>
        )
    }
  }

  export default Home