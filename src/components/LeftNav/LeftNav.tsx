import Link from 'next/link';
import { FaBell, FaEllipsisH, FaEnvelope, FaHome, FaUser } from 'react-icons/fa';
import styles from './LeftNav.module.css';


export default function LeftNav() {
    return (
        <div className={styles.container}>
			<Link href="/users">
				<img src={'../../../quiplr-logo-dark.svg'} alt="logo" style={{ width: "50px" }} />
			</Link>
			<Link href="/">
				<h2 className={styles.icon_links}>
					<FaHome /> <span className={styles.title}>Home</span>
				</h2>
			</Link>
			<Link href="/profile">
				<h2 className={styles.icon_links}>
					<FaUser /> <span className={styles.title}>Profile</span>
				</h2>
			</Link>
			<Link href="/users">
				<h2 className={styles.icon_links}>
					<FaEnvelope /> <span className={styles.title}>Messages</span>
				</h2>
			</Link>
			<Link href="/users">
				<h2 className={styles.icon_links}>
					<FaBell /> <span className={styles.title}>Notifications</span>
				</h2>
			</Link>
			<Link href="/users">
				<h2 className={styles.icon_links}>
					<FaEllipsisH /> <span className={styles.title}>More</span>
				</h2>
			</Link>
		</div>
    )
}
