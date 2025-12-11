import Link from 'next/link';
import styles from './BlogCard.module.css';

interface BlogProps {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    slug: string;
    image?: string;
}

export default function BlogCard({ blog }: { blog: BlogProps }) {
    return (
        <div className={styles.card}>
            {blog.image && (
                <div className={styles.imageWrapper}>
                    <img src={blog.image} alt={blog.title} className={styles.cardImage} />
                </div>
            )}
            <div className={styles.cardContent}>
                <div className={styles.meta}>
                    <span className={styles.category}>{blog.category}</span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.date}>{blog.date}</span>
                </div>
                <Link href={`/blog/${blog.slug}`}>
                    <h3 className={styles.title}>{blog.title}</h3>
                </Link>
                <p className={styles.excerpt}>{blog.excerpt}</p>
                <div className={styles.footer}>
                    <span className={styles.readTime}>{blog.readTime} read</span>
                    <Link href={`/blog/${blog.slug}`} className={styles.readMore}>
                        Read Article →
                    </Link>
                </div>
            </div>
        </div>
    );
}

