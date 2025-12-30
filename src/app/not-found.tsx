import Link from 'next/link';
import { Droplet, ArrowLeft, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <Navbar />

            <main className={styles.main}>
                <div className={styles.paperTexture} />
                <div className={styles.bgInk} />
                <div className={`${styles.inkBloom} ${styles.bloom1}`} />
                <div className={`${styles.inkBloom} ${styles.bloom2}`} />
                <div className={`${styles.inkDrop} ${styles.drop1}`} />
                <div className={`${styles.inkDrop} ${styles.drop2}`} />
                <div className={`${styles.inkDrop} ${styles.drop3}`} />

                <div className={styles.content}>
                    <div className={styles.illustration}>
                        <Droplet size={80} strokeWidth={1.5} />
                    </div>

                    <h1 className={styles.errorCode}>404</h1>
                    <h2 className={styles.title}>The ink has run dry.</h2>
                    <p className={styles.description}>
                        We couldn't find the page you were looking for. It might have been deleted, moved, or never existed in the first place.
                    </p>

                    <div className={styles.actions}>
                        <Link href="/" className={styles.homeBtn}>
                            <ArrowLeft size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                            Back to Home
                        </Link>
                        <Link href="/?explore=true" className={styles.exploreBtn}>
                            <Search size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                            Explore Stories
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
