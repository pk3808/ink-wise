import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../static.module.css";

export default function About() {
    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>About Pensieri</h1>
                    <p className={styles.subtitle}>
                        Reclaiming the internet for thinkers, writers, and deep readers.
                    </p>
                </header>

                <section className={styles.content}>
                    <p>
                        Pensieri was born from a simple observation: the modern web is noisy.
                        Algorithm-driven feeds, intrusive ads, and clickbait headlines have made it
                        increasingly difficult to find, read, and write thoughtful content.
                    </p>
                    <p>
                        We believe that writing is thinking. It deserves a space that respects both the
                        creation process and the reading experience.
                    </p>

                    <h2>Our Mission</h2>
                    <p>
                        To build a digital sanctuary where ideas can breathe. We prioritize typography,
                        white space, and speed over engagement metrics and retention hacks.
                    </p>

                    <h2>Why "Pensieri"?</h2>
                    <p>
                        "Pensieri" is Italian for "thoughts". It reflects our commitment to
                        substance over style, and depth over breadth.
                    </p>
                </section>
            </div>
            <Footer />
        </main>
    );
}
