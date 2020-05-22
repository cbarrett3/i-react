import React, { Component } from 'react'
import * as timeago from 'timeago.js';

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeago: timeago.format(this.props.post.created_at)
    }
  }
  render() {
    console.log(this.props.post.post_tags)
    return (
      <div>
        <div className="flex flex-column pt3 ph3 helvetica bb b--black-10">
          <div className="flex w-100">
            <img
                src="http://tachyons.io/img/logo.jpg"
                className="br-pill h2-m w2-m h2 w2 mr2" alt="avatar">
            </img>
            <a className="link b f5 black pr2" href="#0">
              {this.props.post.author.first} {this.props.post.author.last}
            </a>
            <a className="link f6 gray mr2" href="#0">
              @{this.props.post.author.username} 
            </a>
            <a className="link f6 gray mr2" href="#0">
              &#9642;
            </a>
            <a className="link f6 gray" href="#0">
              {this.state.timeago}
            </a>
          </div>
          <div className="flex w-90 ml4 ph2 pb1">
              {this.props.post.content}
          </div>
          <div className="flex w-90 ml4 ph2 pb3">
             {/* {this.props.post.post_tags[0].tag} */}
             { this.props.post.post_tags.length > 0
                ? <div>
                    {console.log(this.props.post.post_tags)}
                    <div className="" id="tags">
                      <ul style={{listStyle: "none", padding: "0"}}>
                        {this.props.post.post_tags.map(tag =>
                          <li className="pb2 mt3" style={{float: "left", display: "inline-block"}}>
                            <a className='f6 link dim br3 ph3 pv2 mr1 white bg-green helvetica' href='#0'>
                              {tag.tag.tag}
                            </a>
                          </li>
                        )}
                        {/* <li>hi</li> */}
                      </ul>
                    </div>
                  </div> : 
                  <div>
                    {/* nah */}
                  </div>
                            // ? <img src={recent_gray} className="dim" alt="new" style={{cursor: "pointer"}} onClick={()=>this.setState({ newSort: true, hotSort: false, topSort: false })}></img>
                            // : <img src={recent} alt="new" onClick={()=>this.setState({ newSort: true })}></img>
             }
          </div>
        </div>
      </div>
    )
  }
}

export default Post