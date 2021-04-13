import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { ME_QUERY } from "../../pages/profile";
import styles from '../FollowUser/FollowUser.module.css';

const DELETE_FOLLOW_USER_QUERY = gql`
    mutation deleteFollow($id: Int!) {
        deleteFollow(id: $id) {
            id
        }
    }
`


interface Props {
    id: string
}

export default function UnfollowUser({ id }: Props) {
    const [deleteFollow] = useMutation(DELETE_FOLLOW_USER_QUERY, {
        refetchQueries: [{query: ME_QUERY}]
    });

    const handleUnfollow = async () => {
        await deleteFollow({
            variables: {id: parseInt(id)}
        })
    }

    return (
        <div>
            <button onClick={handleUnfollow} className={styles.edit_button}>
                Unfollow
            </button>
        </div>
    )
}
