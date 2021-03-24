import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import CreateProfile from '../components/CreateProfile/CreateProfile';
import UpdateProfile from '../components/UpdateProfile/UpdateProfile';
import styles from '../styles/profile.module.css';

export const ME_QUERY = gql`
    {
        me {  
            id 
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
    const { loading, error, data } = useQuery(ME_QUERY);
    if (loading) return <p>Loading...</p>
    // if (error) return <p>{error.message}</p>
    console.log(error, data)
    return (
        <div className={styles.container}>
            <h1>Profile</h1>
            {data.me.Profile.id ? <UpdateProfile /> : <CreateProfile />}
            {/* <p>{data.me.Profile.bio}</p>
            <p>{data.me.Profile.location}</p>
            <p>{data.me.Profile.website}</p> */}
        </div>
    )
}
