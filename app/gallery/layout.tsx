import React from 'react'; 
import styles from './layout.module.css';

const Layout: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>HNC Gallery</h1>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                <p>&copy; 2023 Gallery</p>
            </footer>
        </div>
    );
};

export default Layout;