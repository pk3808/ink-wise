import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../static.module.css";

export default function Careers() {
    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Join Our Team</h1>
                    <p className={styles.subtitle}>
                        Help us build the future of digital writing.
                    </p>
                </header>

                <section className={styles.content}>
                    <p>
                        We are a small, remote-first team passionate about design, typography, and code.
                        We are currently looking for:
                    </p>

                    <ul>
                        <li><strong>Senior Frontend Engineer</strong> (React/Next.js)</li>
                        <li><strong>Product Designer</strong> (UI/UX)</li>
                        <li><strong>Community Manager</strong></li>
                    </ul>

                    <p>
                        If you are interested, please send your portfolio and resume to{' '}
                        <a href="mailto:careers@pensieri.com" style={{ color: 'var(--primary)' }}>careers@pensieri.com</a>.
                    </p>
                </section>
            </div>
            <Footer />
        </main>
    );
}
