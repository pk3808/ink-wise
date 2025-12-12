import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../static.module.css";

export default function Privacy() {
    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Privacy Policy</h1>
                    <p className={styles.subtitle}>Last updated: December 12, 2025</p>
                </header>

                <section className={styles.content}>
                    <p>
                        At Pensieri, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
                    </p>

                    <h2>1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.
                    </p>

                    <h2>2. How We Use Information</h2>
                    <p>
                        We use the information to provide, maintain, and improve our services, including debugging, data analysis, and personalization.
                    </p>

                    <h2>3. Data Protection</h2>
                    <p>
                        We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.
                    </p>

                    <h2>4. Contact Us</h2>
                    <p>
                        If you have questions about this policy, please contact us at privacy@pensieri.com.
                    </p>
                </section>
            </div>
            <Footer />
        </main>
    );
}
