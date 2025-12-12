import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import React from 'react';
import Link from 'next/link';
import BlogCard from "@/components/BlogCard";
import InteractionBar from "@/components/InteractionBar";
import CommentSection from "@/components/CommentSection";
import ReadingAssistant from "./ReadingAssistant";



const MOCK_DATA = [
    {
        slug: "future-of-writing",
        title: "The Future of Digital Writing dealing with AI",
        excerpt: "How technology is reshaping the way we express our thoughts and connect with others in an increasingly digital world.",
        category: "Technology",
        date: "Dec 12, 2025",
        readTime: "5 min",
        image: "https://picsum.photos/seed/pensieri1/1200/600"
    },
    {
        slug: "minimalism-in-design",
        title: "Why Minimalism in UI is More Than Just a Trend",
        excerpt: "Exploring the psychological impact of clutter-free interfaces and why they dominate modern web design philosophy.",
        category: "Design",
        date: "Dec 10, 2025",
        readTime: "7 min",
        image: "https://picsum.photos/seed/pensieri2/1200/600"
    },
    {
        slug: "reading-habits",
        title: "Cultivating Deep Reading Habits",
        excerpt: "In an age of skim-reading, how can we reclaim the joy of getting lost in a good book or a long-form article.",
        category: "Lifestyle",
        date: "Dec 08, 2025",
        readTime: "4 min",
        image: "https://picsum.photos/seed/pensieri3/1200/600"
    },
    {
        slug: "modern-architecture",
        title: "Sustainable Architecture for 2030",
        excerpt: "A look into how green buildings are becoming the standard for future urban developments.",
        category: "Architecture",
        date: "Dec 05, 2025",
        readTime: "6 min",
        image: "https://picsum.photos/seed/pensieri4/1200/600"
    }
];

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Simulate slow network to show off the loader
    await new Promise(resolve => setTimeout(resolve, 3000));

    const blog = MOCK_DATA.find(b => b.slug === slug) || MOCK_DATA[0];
    const suggested = MOCK_DATA.filter(b => b.slug !== slug).slice(0, 2);

    return (
        <div className={styles.wrapper}>
            <Navbar />

            <article className={styles.article}>
                <header className={styles.header}>
                    <span className={styles.category}>{blog.category}</span>
                    <h1 className={styles.title}>{blog.title}</h1>
                    <div className={styles.meta}>
                        <span>By Author Name</span>
                        <span className={styles.dot}>•</span>
                        <span>{blog.date}</span>
                        <span className={styles.dot}>•</span>
                        <span>{blog.readTime} read</span>
                    </div>
                </header>

                <div className={styles.heroImageContainer}>
                    <img src={blog.image} alt={blog.title} className={styles.heroImage} />
                    <div className={styles.heroOverlay}></div>
                </div>

                <div className={styles.content}>
                    <p className={styles.lead}>
                        {blog.excerpt} This is a template for the blog post content. In a real application, this would be fetched from a CMS or database.
                        Notice how the reading mode theme makes this text warm and easy on the eyes.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h2>Subheading Section</h2>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <blockquote>
                        "Good design is obvious. Great design is transparent." — Joe Sparano
                    </blockquote>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                </div>
            </article>

            <section className={styles.suggestedSection}>
                <div className="container">
                    <h3 className={styles.suggestedTitle}>Suggested Stories</h3>
                    <div className={styles.grid}>
                        {suggested.map(item => (
                            <BlogCard key={item.slug} blog={item} />
                        ))}
                    </div>
                </div>
            </section>

            <CommentSection />

            <ReadingAssistant
                title={blog.title}
                content={`
                    ${blog.title} by Author Name. 
                    ${blog.excerpt} 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Subheading Section.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    "Good design is obvious. Great design is transparent." — Joe Sparano
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                `}
            />

            <InteractionBar />
        </div>
    );
}
