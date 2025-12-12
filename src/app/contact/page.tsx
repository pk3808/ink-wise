import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../static.module.css";

export default function Contact() {
    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Get in Touch</h1>
                    <p className={styles.subtitle}>
                        We'd love to hear from you. Questions, feedback, or just to say hello.
                    </p>
                </header>

                <section className={styles.content}>
                    <div className={styles.contactGrid}>
                        <div className={styles.contactCard}>
                            <span className={styles.contactLabel}>General Inquiries</span>
                            <a href="mailto:hello@pensieri.com" className={styles.contactValue}>hello@pensieri.com</a>
                        </div>

                        <div className={styles.contactCard}>
                            <span className={styles.contactLabel}>Support</span>
                            <a href="mailto:support@pensieri.com" className={styles.contactValue}>support@pensieri.com</a>
                        </div>

                        <div className={styles.contactCard}>
                            <span className={styles.contactLabel}>Press</span>
                            <a href="mailto:press@pensieri.com" className={styles.contactValue}>press@pensieri.com</a>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
