import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { FaThumbsUp } from "react-icons/fa"
import { ME_QUERY } from "../../pages/profile"
import { TWEETS_QUERY } from "../AllQuips/AllQuips"


const LIKE_TWEET_MUTATION = gql`
    mutation likeTweet($id: Int) {
        likeTweet(id: $id) {
            id
        }
    }
`

interface Props {
    id: number 
}

export default function LikeQuip({id}: Props) {
    const [likeTweet] = useMutation(LIKE_TWEET_MUTATION, {
        refetchQueries: [{query: TWEETS_QUERY}, {query: ME_QUERY}]
    })

    const handleCreateLike = async () => {
        await likeTweet({
            variables: {id}
        })
    }

    return (
        <span onClick={handleCreateLike} style={{marginRight: '5px'}}>
            <FaThumbsUp />
        </span>
    )
}
