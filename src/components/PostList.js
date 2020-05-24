import React, { Component } from 'react'
import Post from './Post'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import recent from '../images/new-colored.svg'
import recent_gray from '../images/new-gray.svg'
import hot from '../images/hot-colored.svg'
import hot_gray from '../images/hot-gray.svg'
import top from '../images/top-colored.svg'
import top_gray from '../images/top-gray.svg'
import '../styles/PostList.css';

export const POST_FEED_QUERY = gql`
  {
    postsFeed {
        id
        created_at
        attatchment_url
        content
        author {
            id
            first
            last
            username
        }
        post_comments {
            content
            created_at
            author {
                id
                first
                last
                username
            }
        }
        post_claps {
            id
            author {
                id
                first
                last
                username
            }
        }
        post_tags {
            tag {
                id
                tag
            }
        }
    }
 }
`

class PostList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            newSort: true,
            hotSort: false,
            topSort: false
        }
    }

    updateCacheAfterShaka = (cache, shakaedPostData, postID) => {
        const cacheFeed = cache.readQuery({ query: POST_FEED_QUERY })
        console.log(cacheFeed)
        const postInCacheFeed = cacheFeed.postsFeed.find(post => post.id === postID)
        console.log(postInCacheFeed)
        postInCacheFeed.post_claps = shakaedPostData.createPostClap.post.post_claps
        // cache.writeQuery({ query: POST_FEED_QUERY, cacheFeed })
    }

    render() {
        return (
            <div className="bb bl br b--black-10">
                <div className="flex justify-around nowrap ph3 pv1 bg-light-gray" style={{backgroundColor: "#f2f5f4"}}>
                    <div>
                        { !this.state.newSort
                            ? <img src={recent_gray} className="dim" alt="new" style={{cursor: "pointer"}} onClick={()=>this.setState({ newSort: true, hotSort: false, topSort: false })}></img>
                            : <img src={recent} alt="new" onClick={()=>this.setState({ newSort: true })}></img>
                        }
                    </div>
                    <div>
                        { !this.state.hotSort
                            ? <img src={hot_gray} className="dim" alt="hot" style={{cursor: "pointer"}} onClick={()=>this.setState({ hotSort: true, newSort: false, topSort: false })}></img>
                            : <img src={hot} alt="hot" onClick={()=>this.setState({ hotSort: true })}></img>
                        } 
                    </div>
                    <div>
                        { !this.state.topSort
                            ? <img src={top_gray} className="dim" alt="top" style={{cursor: "pointer"}} onClick={()=>this.setState({ topSort: true, newSort: false, hotSort: false })}></img>
                            : <img src={top} alt="top" onClick={()=>this.setState({ topSort: true })}></img>
                        } 
                    </div>
                </div>
                <Query query={POST_FEED_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <div>Fetching</div>
                        if (error) return <div>Error</div>
                        const postsToRender = data.postsFeed
                        console.log(data.postsFeed)
                        return (
                            <div className="tl" style={{height: "100vh", overflow: "scroll"}}>
                                    {postsToRender.map((post, index) => <Post key={post.id} post={post} index={index} updateCacheAfterShaka={this.updateCacheAfterShaka}/>)}
                            </div>
                        )   
                    }}
                </Query>
            </div>
        )
    }
}

export default PostList