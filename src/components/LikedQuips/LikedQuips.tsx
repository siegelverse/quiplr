import { formatDistance, subDays } from 'date-fns';
import Link from 'next/link';
import styles from '../AllQuips/AllQuips.module.css';


interface AllQuips {
    id: number 
    content: string
    createdAt: Date 
    likes: []
    comments: []
    tweet: any
    author: {
        id: number 
        name: string
        Profile: {
            avatar: string
        }
    }
}

export default function LikedQuips(quips: any) {
    return (
        <div>
            {quips.tweets.likedTweet.map((quip: AllQuips) => (
				<div className={styles.quip_container} key={quip.id}>
					<div className={styles.quip_header}>
							<img
								src={quip.tweet.author?.Profile?.avatar}
								style={{ width: "40px", borderRadius: "50%" }}
								alt="avatar"
							/>
				
						<Link href={{pathname: '/user/[id]', query: {id: quip.tweet.author?.id}}}>
							<h4 className={styles.name}>{quip.tweet.author?.name}</h4>
						</Link>
						<p className={styles.date_time}>
							{formatDistance(subDays(new Date(quip.tweet.createdAt), 0), new Date())} ago
						</p>
					</div>
					<Link href={{pathname: '/quip/[id]', query: {id: quip.tweet.id}}}>
						<p>{quip.tweet.content}</p>
					</Link>	
				</div>
			))}
        </div>
    )
}
