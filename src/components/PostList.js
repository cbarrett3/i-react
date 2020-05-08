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

const POST_FEED_QUERY = gql`
  {
    postsFeed {
        id
        created_at
        attatchment_url
        content
        author_id
        author {
            first
            last
        }
        post_comments {
            content
            created_at
            author {
                first
                last
            }
        }
        post_claps {
            id
            author_id
            author {
                first
                last
            }
        }
        post_tags {
            tag {
                tag
            }
        }
    }
 }
`

class PostList extends Component {
  render() {
    return (
        <div className="ph3">
            <div className="flex justify-around nowrap br3 pv1 bg-light-gray">
                <div>
                    {/* <nav class="pa3 pa4-ns">
                        <a class="link dim black b f6 f5-ns dib mr3" href="#0" title="Home">Site Name</a>
                        <a class="link dim gray f6 f5-ns dib mr3" href="#0" title="Home">Home</a>
                        <a class="link dim gray f6 f5-ns dib mr3" href="#0" title="About">About</a>
                        <a class="link dim gray f6 f5-ns dib mr3" href="#0" title="Store">Store</a>
                        <a class="link dim gray f6 f5-ns dib" href="#0" title="Contact">Contact</a>
                    </nav> */}
                    <img src={recent} class="mr2 dim" alt="new"></img>
                </div>
                <div>
                    <img src={hot_gray} class="mr2" alt="hot"></img>
                </div>
                <div>
                    <img src={top_gray} class="mr2 " alt="top"></img>
                </div>
            </div>
            <Query query={POST_FEED_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
                    const postsToRender = data.postsFeed
                    return (
                        <div className="tl">
                            {postsToRender.map(post => <Post key={post.id} post={post} />)}
                        </div>
                    )
                }}
            </Query>
        </div>
    )
  }
}

export default PostList