import React, { useState } from 'react'
import Post from './Post'
import { useQuery } from '@apollo/react-hooks';
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
            id
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
`;

function PostList(props) {
    const [ newSort, setNewSort] = useState(true)
    const [ hotSort, setHotSort] = useState(false)
    const [ topSort, setTopSort] = useState(false)
    const { loading, error, data } = useQuery(POST_FEED_QUERY);

    const updateCacheAfterShakaDeletion = (cache, data, postID) => {
        const feedFromCache = cache.readQuery({ query: POST_FEED_QUERY })
        // find post
        const postFromCache = feedFromCache.postsFeed.find(post => post.id === postID)
        // find shaka to remove from cache
        // const shakaToDelete = postFromCache.post_claps.find(shaka => shaka.id === data.data.deletePostClap.id)
        // update posts shakas to exclude the shaka id found above
        postFromCache.post_claps = postFromCache.post_claps.filter(shaka => shaka.id !== postFromCache.post_claps.find(shaka => shaka.id === data.data.deletePostClap.id).id)
        // update local store (cache)
        // cache.writeQuery({ query: POST_FEED_QUERY, data:{ postsFeed: feedFromCache }})
    }   

    return (
        <div className="bb bl br b--black-10">
            <div className="flex justify-around nowrap ph3 pv1 bg-light-gray" style={{backgroundColor: "#f2f5f4"}}>
                <div>
                    { !newSort
                        ? <img src={recent_gray} className="dim" alt="new" style={{cursor: "pointer"}} onClick={() => {setNewSort(true); setHotSort(false); setTopSort(false);}}></img>
                        : <img src={recent} alt="new" onClick={() => {setNewSort(true)}}></img>
                    }
                </div>
                <div>
                    { !hotSort
                        ? <img src={hot_gray} className="dim" alt="hot" style={{cursor: "pointer"}} onClick={() => {setNewSort(false); setHotSort(true); setTopSort(false);}}></img>
                        : <img src={hot} alt="hot" onClick={() => {setHotSort(true)}}></img>
                    } 
                </div>
                <div>
                    { !topSort
                        ? <img src={top_gray} className="dim" alt="top" style={{cursor: "pointer"}} onClick={() => { setNewSort(false); setHotSort(false); setTopSort(true);}}></img>
                        : <img src={top} alt="top" onClick={() => {setTopSort(true)}}></img>
                    } 
                </div>
            </div>
            {data
                ? 
                <div className="tl" style={{height: "100vh", overflow: "scroll"}}>
                    {data.postsFeed.map((post, index) => <Post post={post} key={index} updateCacheAfterShakaDeletion={updateCacheAfterShakaDeletion}/>)}
                </div>
                :
                <div></div>
            }
            {loading && 
                <div className="tc helvetica gray"> 
                    <div className="wrapper">
                        <div className="loader-box">
                            <div className="loader">
                            
                            </div>
                            <div className="loader-text">
                                loading
                            </div>
                        </div>
                        
                        {/* <div class="description-box">
                            This is a simple lightweight loading spinner
                        </div> */}
                    </div>
                </div>
            }
            {error && <div className="tc helvetica gray"> our bad! error fetching post data. come back later please. </div> }
        </div>
    )
}

export default PostList