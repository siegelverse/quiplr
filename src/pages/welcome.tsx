import React from 'react';
import Link from 'next/link';
import styles from '../styles/welcome.module.css';
import { GiMicrophone } from 'react-icons/gi';
import { IoMdShareAlt } from 'react-icons/io';
import { FaRegLaughSquint } from 'react-icons/fa';

export default function WelcomePage() {
    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <div className={styles.items_wrapper}>
                        <div className={styles.item}>
                            <span className={styles.icon}>
                                <GiMicrophone />
                            </span>
                            <span className={styles.label}>Tell Jokes.</span>
                        </div>
                    <div className={styles.item}>
                        <span className={styles.icon}>
                            <IoMdShareAlt />
                        </span>
                        <span className={styles.label}>Share Jokes.</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.icon}>
                            <FaRegLaughSquint />
                        </span>
                        <span className={styles.label}>Laugh.</span>
                    </div>
                </div>
            </div>
    
            <div className={styles.center}>
                <img src={'../../quiplr-logo-light.svg'} alt="logo" style={{ width: "100px" }} />
                <h1>
                    See what's making people
                <br />
                    laugh right now
                </h1>
                <span>Join quiplr today!</span>
                <Link href='/signup'>
                    <a className={styles.btn_sign_up}>Sign up</a>
                </Link>
                <Link href='/login'>
                    <a className={styles.btn_login}>Log in</a>
                </Link>
            </div>
            </div>
        </div>
    )
}
