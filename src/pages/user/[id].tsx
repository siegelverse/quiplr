import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styles from '../../styles/profile.module.css';
import { FaArrowLeft, FaLink, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LeftNav from '../../components/LeftNav/LeftNav';
import UpdateProfile from '../../components/UpdateProfile/UpdateProfile';
import CreateProfile from '../../components/CreateProfile/CreateProfile';
import PopularQuips from '../../components/PopularQuips/PopularQuips';
import { ME_QUERY } from '../profile';
import FollowUser from '../../components/FollowUser/FollowUser';
import UnfollowUser from '../../components/UnfollowUser/UnfollowUser';

export const USER_QUERY = gql`
    query user($id: Int) {
        user(id: $id) {  
            id 
            name 
            Profile {
                id 
                avatar
                website
            }
        }
    }
`

export default function SingleUser() {
    const router = useRouter()
    const id: any = router.query.id
    const { loading, error, data } = useQuery(USER_QUERY, {
        variables: {id: parseInt(id)}
    });
    const { loading: meLoading, error: meError, data: meData } = useQuery(ME_QUERY);


    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    if (meLoading) return <p>Loading...</p>
    if (meError) return <p>{meError.message}</p>

    interface FollowerIds {
        followId: number
        id: number
    }

    const idOfFollowers = meData.me.Following.map((follow: FollowerIds) => follow.followId)

    const follows = meData.me.Following.map((follow: FollowerIds) => follow)

    const getFollowId = follows.filter((follow: any) => follow.followId === data.user.id)
    
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
                                <h3>{data.user.name}</h3>
                            </span>
                        </div>
                        <div className={styles.avatar}>
                            {data.user.Profile.avatar ?  
                            (<img src={data.user.Profile.avatar} alt='avatar' style={{ width: '125px', borderRadius: '50%' }} />)
                            : <FaUser size={70} />}
                        </div>
                        <div className={styles.make_profile}>
                            {idOfFollowers.includes(data.user.id) ? (
                                <UnfollowUser id={getFollowId[0].id} />
                                ):
                                <FollowUser id={data.user.id} name={data.user.name} avatar={data.user.Profile.avatar} />
                            }
                        </div>

                        <h3 className={styles.name}>{data.user.name}</h3>

                        <p className={styles.location}>{data.user.Profile.location}</p>

                        {data.user.Profile ? (
                            <p>
                                <FaLink />
                                <Link href={`http://${data.user.Profile.website}`}>{data.user.Profile.website}</Link>
                            </p>
                        ) : null}
                        <div className={styles.followers}>
                            <p>0 following</p>
                            <p>0 followers</p>
                        </div>
                    </div>
                </div>  
                <div className={styles.right}>
                    <PopularQuips />
                </div>  
            </div>
        </>
    )
}
