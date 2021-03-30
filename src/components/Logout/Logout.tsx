import styles from './Logout.module.css';
import { useState } from 'react';
import { logoutModalStyles } from '../../styles/logoutModal';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { useQuery } from '@apollo/client';
import { ME_QUERY } from '../../pages/profile';
import { FaEllipsisH } from 'react-icons/fa';

export default function Logout() {
    const router = useRouter();
    const [modalIsOpen, setIsOpen] = useState(false)

    const {loading, error, data} = useQuery(ME_QUERY);
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>


    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleLogout = async () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    return (
        <div className={styles.logout}>
            <span onClick={openModal} className={styles.container}>
                <h4 className={styles.info}>
                    <img src={data.me.Profile.avatar} style={{ width: '35px', borderRadius: '50%' }} alt='avatar' />
                    <span style={{ marginLeft: '10px' }}>{data.me.name}</span>
                    <span style={{ marginLeft: '20px' }}>
                        <FaEllipsisH /> 
                    </span>
                </h4>
            </span>
            <div style={{ position: 'absolute', bottom: 0 }}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel='Modal'
                    style={logoutModalStyles}
                >
                    <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        <p style={{ borderBottom: '1px solid var(--primary-color)' }}>Logout @{data.me.name}</p>
                    </span>

                </Modal>
            </div>
        </div>
    )
}
