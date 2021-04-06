import styles from './Home.module.css';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { FaArrowLeft, FaLink, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LeftNav from '../LeftNav/LeftNav';
import profileStyles from '../../styles/profile.module.css';
import AllQuips from '../AllQuips/AllQuips';
import HomePageQuip from '../HomePageQuip/HomePageQuip';

export const ME_QUERY = gql`
    query me {
        me {  
            id 
            name
            likedTweet {
                id
                tweet {
                    id
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

export default function Home() {
    const router = useRouter();
    const { loading, error, data } = useQuery(ME_QUERY);
    if (loading) return <p>Loading...</p>
    // if (error) return <p>{error.message}</p>
    console.log(data)
    return (
        <>
            <div className={profileStyles.primary}>
                <div className={profileStyles.left}>
                    <LeftNav />
                </div>
                <div className={styles.home}>
                    <div className={styles.home_header}>
                        <h3 className={styles.home_title}>Home</h3>
                        <HomePageQuip />
                        <AllQuips />
                    </div>
                </div>
                <div className={styles.right}>
                    Right
                </div>  
            </div>
        </>
    )
}
