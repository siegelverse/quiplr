import { useEffect, useState } from 'react';
import { MdBrightness4 } from 'react-icons/md';
import Head from 'next/head';
import Link from 'next/link';
import styles from './Layout.module.css';

const Layout = ({ children, title = 'quiplr' }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'))
        setTheme(localStorage.getItem('theme'))
    }, [])

    const toggleTheme = () => {
        if (theme === 'light') {
            saveTheme('dark')
        } else {
            saveTheme('light')
        }
    }

    const saveTheme = (theme) => {
        setTheme(theme)
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <header className={styles.header}>
                <Link href='/'>
                    <img src='/logo.svg' alt='logo' />
                </Link>
                <button className={styles.theme_toggle} onClick={toggleTheme}>
                    <MdBrightness4 />
                </button>
            </header>
    
            <main className={styles.main}>
                {children}
            </main>
    
            <footer className={styles.footer}>
                <a href='http://www.marcus-siegel.dev'>© Marcus Siegel</a>
            </footer>
        </div>
    )
}

export default Layout;