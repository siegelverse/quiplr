import { useQuery } from "@apollo/client";
import { subDays } from "date-fns";
import { formatDistance } from "date-fns/esm";
import gql from "graphql-tag";
import Link from "next/link";
import { FaThumbsUp } from "react-icons/fa";
import { ME_QUERY } from "../../pages/profile";
import Comment from "../Comment/Comment";
import DeleteLike from "../DeleteLike/DeleteLike";


import LikeQuip from "../LikeQuip/LikeQuip";
import styles from '../AllQuips/AllQuips.module.css';

export const TWEETS_QUERY = gql`
    query TWEETS_QUERY {
        tweets {
            id 
            createdAt
            content
            likes {
                id
            }
            comments {
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

export default function UserQuips({ id }) {
    const { loading, error, data } = useQuery(TWEETS_QUERY);
    const { loading: meLoading, error: meError, data: meData } = useQuery(ME_QUERY);

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    
    if (meLoading) return <p>Loading...</p>
    if (meError) return <p>{meError.message}</p>

    interface UserQuips {
        id: number
        content: string
        createdAt: any
        likes: []
        comments: []
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

    const getUserQuips = data.tweets.filter((tweet: UserQuips) => tweet.author.id === id)
    console.log(id)

    const sortQuipsByDate = getUserQuips.map((quip: UserQuips) => quip).sort(function(a: UserQuips, b: UserQuips) {
        return b.createdAt - a.createdAt
    })
    return (
        <div>
            {sortQuipsByDate.map((tweet: UserQuips) => (
                <div className={styles.quip_container}>
                    <Link href={{pathname: '/quip/[id]', query: {id: tweet.id}}} key={tweet.id}>
                        <div className={styles.quip_header}>
                            <img 
                                src={tweet.author.Profile.avatar} 
                                style={{ width: '40px', borderRadius: '50%' }} 
                                alt="avatar"
                            />
                            <Link href={{pathname: '/user/[id]', query: {id: tweet.author.id}}} >
                                <h4 className={styles.name}>{tweet.author.name}</h4>
                            </Link>
                            <p className={styles.date_time}>{formatDistance(subDays(new Date(tweet.createdAt), 0), new Date())} ago</p>
                        </div>
                    </Link>
                    <p className={styles.quip_content}>{tweet.content}</p>
                    <div className={styles.likes}>
                        {meData.me.likedTweet.map((t: likedTweets) => t.tweet.id).includes(tweet.id) ? 
                        (
                            <span>
                                <DeleteLike id={meData.me.likedTweet.filter((like: likedTweets) => like.tweet.id === tweet.id)[0].id} />
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
                        <span style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                            <Comment 
                                avatar={tweet.author.Profile.avatar} 
                                name={tweet.author.name} 
                                tweet={tweet.content}
                                id={tweet.id} 
                            />
                            {tweet.comments.length > 0 ? tweet.comments.length : null}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}