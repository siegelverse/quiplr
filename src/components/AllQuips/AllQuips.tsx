import { useQuery } from "@apollo/client";
import { subDays } from "date-fns";
import { formatDistance } from "date-fns/esm";
import gql from "graphql-tag";
import styles from '../Home/Home.module.css';

const TWEETS_QUERY = gql`
    query TWEETS_QUERY {
        tweets {
            id 
            createdAt
            content
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
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    interface AllQuips {
        content: string
        createdAt: Date
        author: {
            id: number
            name: string
            Profile: {
                id: number
                avatar: string
            }
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
                        {/* <p className={styles.date_time}>{formatDistance(subDays(new Date(tweet.createdAt), 0), new Date())} ago</p> */}
                    </div>
                    <p className={styles.quip_content}>{tweet.content}</p>
                </div>
            ))}
        </div>
    )
}
