import React, { Component } from 'react'
import Post from './Post'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const FEED_QUERY = gql`
  {
    feed {
        id
        created_at
        attatchment_url
        content
        author_id
        author {
            first
            last
        }
        comments {
            content
            created_at
            author {
                first
                last
            }
        }
        claps {
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
        <Query query={FEED_QUERY}>
            {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>
                const postsToRender = data.feed
                return (
                    <div>
                        {postsToRender.map(post => <Post key={post.id} post={post} />)}
                    </div>
                )
            }}
        </Query>
    )
  }
}

export default PostList