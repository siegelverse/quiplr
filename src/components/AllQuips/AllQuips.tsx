import { useQuery } from "@apollo/client";
import { subDays } from "date-fns";
import { formatDistance } from "date-fns/esm";
import gql from "graphql-tag";
import { FaThumbsUp } from "react-icons/fa";
import { ME_QUERY } from "../Home/Home";

import LikeQuip from "../LikeQuip/LikeQuip";
import styles from './AllQuips.module.css';

export const TWEETS_QUERY = gql`
    query TWEETS_QUERY {
        tweets {
            id 
            createdAt
            content
            likes {
                id
            }
            author {
                id 
                name
                Profile {
                    id 
                    avatar
                }
            }
        }
    }
`

export default function AllQuips() {
    const { loading, error, data } = useQuery(TWEETS_QUERY);
    const { loading: meLoading, error: meError, data: meData } = useQuery(ME_QUERY);
    console.log(meData)

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    
    if (meLoading) return <p>Loading...</p>
    if (meError) return <p>{meError.message}</p>

    interface AllQuips {
        id: number
        content: string
        createdAt: Date
        likes: []
        author: {
            id: number
            name: string
            Profile: {
                id: number
                avatar: string
            }
        }
    }

    interface likedTweets {
        id: number
        tweet: {
            id: number
        }
    }
    return (
        <div>
            {data.tweets.map((tweet: AllQuips) => (
                <div className={styles.quip_container}>
                    <div className={styles.quip_header}>
                        <img 
                            src={tweet.author.Profile.avatar} 
                            style={{ width: '40px', borderRadius: '50%' }} 
                            alt="avatar"
                        />
                        <h4 className={styles.name}>{tweet.author.name}</h4>
                        <p className={styles.date_time}>{formatDistance(subDays(new Date(tweet.createdAt), 0), new Date())} ago</p>
                    </div>
                    <p className={styles.quip_content}>{tweet.content}</p>
                    <div className={styles.likes}>
                        {meData.me.likedTweet.map((t: likedTweets) => t.tweet.id).includes(tweet.id) ? 
                        (
                            <span>
                                <span style={{marginRight: '5px'}}>
                                    <FaThumbsUp />
                                </span>
                                {tweet.likes.length}
                            </span>
                        )
                        : 
                        (
                            <span>
                                <LikeQuip id={tweet.id} />
                                {tweet.likes.length}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
