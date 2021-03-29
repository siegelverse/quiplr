import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import CreateProfile from '../components/CreateProfile/CreateProfile';
import UpdateProfile from '../components/UpdateProfile/UpdateProfile';
import styles from '../styles/profile.module.css';
import { FaArrowLeft, FaLink, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LeftNav from '../components/LeftNav/LeftNav';

export const ME_QUERY = gql`
    query me {
        me {  
            id 
            name
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
    // if (error) return <p>{error.message}</p>
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
                            {data.me.Profile.avatar ?  
                            (<img src={data.me.Profile.avatar} alt='avatar' style={{ width: '125px', borderRadius: '50%' }} />)
                            : <FaUser size={70} />}
                        </div>
                        <div className={styles.make_profile}>
                            {data.me.Profile ? <UpdateProfile /> : <CreateProfile />}
                        </div>

                        <h3 className={styles.name}>{data.me.name}</h3>

                        <p className={styles.location}>{data.me.Profile.location}</p>

                        {data.me.Profile ? (
                            <p>
                                <FaLink />
                                <Link href={`http://${data.me.Profile.website}`}>{data.me.Profile.website}</Link>
                            </p>
                        ) : null}
                        <div className={styles.followers}>
                            <p>0 following</p>
                            <p>0 followers</p>
                        </div>
                    </div>
                </div>  
                <div className={styles.right}>
                    Right
                </div>  
            </div>
        </>
    )
}
