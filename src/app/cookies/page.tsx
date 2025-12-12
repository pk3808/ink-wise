import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../static.module.css";

export default function Cookies() {
    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Cookie Policy</h1>
                    <p className={styles.subtitle}>Last updated: December 12, 2025</p>
                </header>

                <section className={styles.content}>
                    <p>
                        Pensieri uses cookies to enhance your experience. By using our website, you agree to our use of cookies.
                    </p>

                    <h2>What are cookies?</h2>
                    <p>
                        Cookies are small text files that are placed on your computer by websites that you visit.
                        They are widely used to make websites work more efficiently.
                    </p>

                    <h2>How we use cookies</h2>
                    <ul>
                        <li>To remember your preferences and settings.</li>
                        <li>To understand how you use our service (Analytics).</li>
                        <li>To keep you signed in.</li>
                    </ul>

                    <h2>Managing cookies</h2>
                    <p>
                        Most web browsers allow some control of most cookies through the browser settings.
                    </p>
                </section>
            </div>
            <Footer />
        </main>
    );
}
