import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const IS_LOGGED_IN = gql`
    query me {
        me {
            id
        }
    }
`
interface Props {
    children?: React.ReactNode
}

export default function IsAuth({ children }: Props): JSX.Element {
    const router = useRouter();
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    console.log(data)
    if (!data.me) {
        router.push('/welcome')
        return <p>Loading...</p>
    }

    return <>{children}</>
}
