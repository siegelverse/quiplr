import styles from './quip.module.css';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter, withRouter } from 'next/router';
import profileStyles from '../../styles/profile.module.css';
import LeftNav from '../../components/LeftNav/LeftNav';
import PopularQuips from '../../components/PopularQuips/PopularQuips';
import CreateReply from '../../components/CreateReply/CreateReply';


export const TWEET_QUERY = gql`
    query tweet($id: Int) {
        tweet(id: $id) {  
            id 
            content
            author {
                id
                name 
                Profile {
                    id
                    avatar
                }
            }
            comments {
                id 
                content
                createdAt
                User {
                    id 
                    name 
                    Profile {
                        id 
                        avatar
                    }
                }
            }
        }
    }
`

interface ParamType {
    id: string
}

interface CommentType {
    id: number
    content: string
    createdAt: Date
    User: {
        id: number
        name: string
        Profile: {
            id: number
            avatar: string
        }
    }
}


export default function SingleQuip() {
    const router = useRouter()
    const id: any = router.query.id
    const { loading, error, data } = useQuery(TWEET_QUERY, {
        variables: {id: parseInt(id)}
    });
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    return (
        <>
            <div className={profileStyles.primary}>
                <div className={profileStyles.left}>
                    <LeftNav />
                </div>
                <div className={styles.home}>
                    <div className={styles.home_header}>
                        <span onClick={() => router.back()}>
                            <FaArrowLeft className={styles.back_arrow} />
                        </span>
                        <h3 className={styles.home_title}>Quip</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 8fr", marginTop: "10px" , marginLeft: '20px'}}>
				            <img src={data.tweet.author.Profile.avatar} style={{ width: "40px", borderRadius: "50%" }} alt="avatar" />
				            <h5>{data.tweet.author.name}</h5>
			            </div>
                        <p
                            style={{
                                marginLeft: "40px",
                                borderLeft: "1px solid var(--accent)",
                                paddingLeft: "20px",
                                height: "50px",
                                marginTop: 0
                            }}
                        >
				            {data.tweet.content}
			            </p>
                        {data.tweet.comments.map((comment: CommentType) => (
                            <>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 8fr", marginTop: "10px", marginLeft: '20px' }}>
                                    <img src={comment.User.Profile.avatar} style={{ width: "40px", borderRadius: "50%" }} alt="avatar" />
                                    <h5>{comment.User.name}</h5>
                                </div>
                                <p 
                                    style={{
                                    marginLeft: "40px",
                                    borderLeft: "1px solid var(--accent)",
                                    paddingLeft: "20px",
                                    height: "50px",
                                    marginTop: 0
                                }}>
                                    {comment.content}
                                </p>
                                <CreateReply name={comment.User.name} avatar={comment.User.Profile.avatar} id={data.tweet.id} comment={comment.content} commentId={comment.id} />
                            </>
                        ))}
                    </div>
                </div>
                <div className={profileStyles.right}>
                    <PopularQuips />
                </div>  
            </div>
        </>
    )
}