import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import gql from "graphql-tag";
import styles from './PopularQuips.module.css';

export const POPULAR_TWEETS = gql`
    query POPULAR_TWEETS {
        tweets {
            id
            createdAt
            content
            author {
                id 
                Profile {
                    id 
                    avatar
                }
            }
            likes {
                id
            }
        }
    }
`

interface Quip {
    id: number 
    createdAt: Date
    content: string
    author: {
        Profile: {
            avatar: string
        }
    }
    likes: {
        id: number
        length: number
    }
}

export default function PopularQuips() {
    const { loading, error, data } = useQuery(POPULAR_TWEETS);
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    const getPopularQuips = data.tweets.map((quip: Quip) => quip).sort(function(a: Quip, b: Quip) {
        return b.likes.length - a.likes.length
    }).slice(0, 6)

    return (
        <div className={styles.popular_quips}>
            <h3 className={styles.trending}>Trending</h3>
            {getPopularQuips.map((quip: Quip) => (
                <div className={styles.popular_quip_container} key={quip.id}>
                    <div className={styles.date_title}>
                        <div className={styles.title_logo}>
                            <img src={quip.author.Profile.avatar} style={{ width: '40px', borderRadius: '50%' }} alt="avatar" />
                            <p className={styles.quip_content}>{quip.content}</p>
                        </div>
                        <p className={styles.date}>
                            {format(new Date(quip.createdAt), 'MM/dd/yy')}
                        </p>
                    </div>
                    <div className={styles.quip_likes}>
                        {quip.likes.length > 0 ? <span>Likes {quip.likes.length}</span> : null}
                    </div>
                </div>
            ))}
        </div>
    )
}
