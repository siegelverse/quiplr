import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import CreateProfile from '../components/CreateProfile/CreateProfile';
import UpdateProfile from '../components/UpdateProfile/UpdateProfile';
import styles from '../styles/profile.module.css';
import { FaArrowLeft, FaLink, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LeftNav from '../components/LeftNav/LeftNav';
import PopularQuips from '../components/PopularQuips/PopularQuips';
import LikedQuips from '../components/LikedQuips/LikedQuips';
import Following from '../components/Following/Following';

export const ME_QUERY = gql`
    query me {
        me {  
            id 
            name
            Following {
                id 
                followId
                name 
                avatar
            }
            likedTweet {
                id
                tweet {
                    id
                    content
                    createdAt
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
            Profile {
                id
                bio
                location
                website
                avatar
            }
        }
    }
`

export default function Profile() {
    const router = useRouter();
    const { loading, error, data } = useQuery(ME_QUERY);
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    console.log(data)
    return (
        <>
            <div className={styles.primary}>
                <div className={styles.left}>
                    <LeftNav />
                </div>
                <div className={styles.profile}>
                    <div className={styles.profile_info}>
                        <div className={styles.profile_head}>
                            <span onClick={() => router.back()}>
                                <FaArrowLeft className={styles.back_arrow} />
                            </span>
                            <span className={styles.nickname}>
                                <h3>{data.me.name}</h3>
                            </span>
                        </div>
                        <div className={styles.avatar}>
                            {data.me.Profile?  
                            (<img src={data.me.Profile.avatar} alt='avatar' style={{ width: '125px', borderRadius: '50%' }} />)
                            : <FaUser size={70} />}
                        </div>
                        <div className={styles.make_profile}>
                            {data.me.Profile ? <UpdateProfile /> : <CreateProfile />}
                        </div>

                        <h3 className={styles.name}>{data.me.name}</h3>

                        {data.me.Profile ? (
                            <p className={styles.location}>{data.me.Profile.location}</p>
                        ): null}

                        {data.me.Profile ? (
                            <p>
                                <FaLink />
                                <Link href={`http://${data.me.Profile.website}`}>{data.me.Profile.website}</Link>
                            </p>
                        ) : null}
                        <div className={styles.followers}>
                            <Following />
                            <p>0 followers</p>
                        </div>
                    </div>
                    {data.me.likedTweet.tweet ? (
                        <LikedQuips quips={data.me} />
                    ): null}
                </div>  
                <div className={styles.right}>
                    <PopularQuips />
                </div>  
            </div>
        </>
    )
}
