import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../static.module.css";

export default function Terms() {
    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Terms of Service</h1>
                    <p className={styles.subtitle}>Last updated: December 12, 2025</p>
                </header>

                <section className={styles.content}>
                    <p>
                        By accessing or using Pensieri, you agree to be bound by these Terms of Service.
                    </p>

                    <h2>1. Content</h2>
                    <p>
                        You retain ownership of the content you post on Pensieri. However, you grant us a license to display and distribute your content on our platform.
                    </p>

                    <h2>2. Conduct</h2>
                    <p>
                        You agree not to use the platform for any illegal purpose or to harass, abuse, or harm others. We reserve the right to remove content that violates these terms.
                    </p>

                    <h2>3. Termination</h2>
                    <p>
                        We may terminate or suspend your access to our service immediately, without prior notice, for any reason whatsoever.
                    </p>
                </section>
            </div>
            <Footer />
        </main>
    );
}
