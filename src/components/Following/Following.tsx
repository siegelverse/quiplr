import Modal from 'react-modal';
import { customStyles } from '../../styles/quipModalStyles';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ME_QUERY } from '../../pages/profile';
import { FaTimes } from 'react-icons/fa';
import styles from '../Quip/Quip.module.css';
import Link from 'next/link';


export default function Following() {
    const { loading, error, data } = useQuery(ME_QUERY)
    const [modalIsOpen, setIsOpen] = useState(false)

    
    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }


    return (
        <div>
        <span onClick={openModal}>
            <p>Following {data.me.Following.length}</p>
        </span>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Modal'
                style={customStyles}
            >

            <span className={styles.exit} onClick={closeModal}>
                <FaTimes />
            </span>

            <div className={styles.header}></div>
				<div style={{ marginLeft: "20px" }}>
					{data.me.Following.map((person: any) => (
						<div style={{ borderBottom: 'var(--accent)', padding: "5px" }} key={person.id}>
							<div className={styles.quip_header}>
								<img src={person.avatar} style={{ width: "40px", borderRadius: "50%" }} alt="avatar" />

								<Link href={{pathname: '/user/[id]', query: {id: person.followId}}}>
									<h4 className={styles.name}>{person.name} </h4>
								</Link>
							</div>
						</div>
					))}
				</div>
            </Modal>     
        </div>
    )
}