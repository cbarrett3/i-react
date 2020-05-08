import React, { Component } from 'react'
import Post from './Post'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import recent from '../images/new-icon.svg'
import fire from '../images/fire-icon.svg'
import loved from '../images/most-loved.svg'

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
                    <img src={recent} class="mr2" alt="newicon"></img>
                </div>
                <div>
                    <img src={fire} class="mr2" alt="fire"></img>
                </div>
                <div>
                    <img src={loved} class="mr2" alt="loved"></img>
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