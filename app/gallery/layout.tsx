import React from 'react'; 
import styles from './layout.module.css';

const Layout: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Harvey Norman Commercial Division</h1>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} Harvey Norman Commervcial Division.</p>
            </footer>
        </div>
    );
};

export default Layout;