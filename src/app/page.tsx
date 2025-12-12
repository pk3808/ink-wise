"use client";

import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MOCK_BLOGS, CATEGORIES } from "@/data/mockData";

const FLOATING_REVIEWS = [
  { id: 1, name: "Alex R.", role: "Writer", text: "Pensieri helped me find my voice.", avatar: "A", pos: styles.pos1 },
  { id: 2, name: "Sarah J.", role: "Reader", text: "A sanctuary for thoughtful content.", avatar: "S", pos: styles.pos2 },
  { id: 3, name: "Davide", role: "Creator", text: "Finally, a clean space to write.", avatar: "D", pos: styles.pos3 },
  { id: 4, name: "Emily", role: "Poet", text: "Pure aesthetic joy.", avatar: "E", pos: styles.pos4 },
  { id: 5, name: "Mark", role: "Dev", text: "Minimalism done right.", avatar: "M", pos: styles.pos5 },
];

export default function Home() {

  const heroRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.4 } // Trigger when 40% of hero is visible
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <main className={styles.main}>
      <Navbar />

      <header className={styles.hero} ref={heroRef}>
        <div className={`container ${styles.heroContainer}`}>

          {/* Centered Content */}
          <div className={styles.heroContent}>
            {/* Rating Stars (Mock) */}
            <div className={styles.ratingBadge}>
              <span className={styles.stars}>★★★★★</span>
              <span className={styles.ratingText}>Loved by 10,000+ readers</span>
            </div>

            <h1 className={styles.heroTitle}>
              Share your <span className={styles.heroHighlight}>creative journey.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              A distraction-free platform for writers, thinkers, and storytellers.
              Start your blog in seconds.
            </p>

            <button className={styles.ctaButton}>Start Writing</button>
          </div>

          {/* Floating Cards */}
          <div className={`${styles.floatingCards} ${isHeroVisible ? styles.visible : styles.hidden}`}>
            {FLOATING_REVIEWS.map((review) => (
              <div key={review.id} className={`${styles.floatCard} ${review.pos}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardAvatar}>{review.avatar}</div>
                  <div>
                    <p className={styles.cardName}>{review.name}</p>
                    <p className={styles.cardRole}>{review.role}</p>
                  </div>
                </div>
                <p className={styles.cardText}>"{review.text}"</p>
              </div>
            ))}
          </div>

        </div>
      </header>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Explore Topics</h2>
            <p className={styles.sectionSubtitle}>Discover stories that matter to you.</p>
          </div>

          <div className={styles.categoryList}>
            {CATEGORIES.map((cat) => (
              <Link href={`/topic/${cat.slug}`} key={cat.name} className={styles.categoryCard}>
                <span className={styles.catIcon}>
                  {cat.slug === 'technology' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /></svg>}
                  {cat.slug === 'design' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /></svg>}
                  {cat.slug === 'culture' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /></svg>}
                  {cat.slug === 'business' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>}
                  {cat.slug === 'self' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22v-9" /><path d="M5.2 22h13.6" /><path d="M12 13a4 4 0 0 0-4-4 4.5 4.5 0 0 1-4.5-4.5c0-2 .5-3 1.5-4 .25-.25.5-.37.8-.52a5.5 5.5 0 0 1 8.2 2.02" /></svg>}
                </span>
                <span className={styles.catName}>{cat.name}</span>
                <span className={styles.catCount}>{cat.count} stories</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className={styles.trendingSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Trending on Pensieri</h2>
          </div>
          <div className={styles.trendingGrid}>
            {[
              { id: "01", title: "The Art of Doing Nothing", author: "Elena Fisher", time: "Dec 11", image: "https://picsum.photos/seed/trend1/200/200" },
              { id: "02", title: "Why I Switched from VS Code back to Vim", author: "Dev Singh", time: "Dec 10", image: "https://picsum.photos/seed/trend2/200/200" },
              { id: "03", title: "Can AI Truly Understand Context?", author: "Sarah Jenkins", time: "Dec 09", image: "https://picsum.photos/seed/trend3/200/200" },
              { id: "04", title: "Designing for the Next Billion Users", author: "Marc O.", time: "Dec 08", image: "https://picsum.photos/seed/trend4/200/200" },
              { id: "05", title: "A Letter to My Younger Self", author: "Anonymous", time: "Dec 07", image: "https://picsum.photos/seed/trend5/200/200" },
              { id: "06", title: "The 3-Day Monk Mode Protocol", author: "Tim Ferris Fan", time: "Dec 06", image: "https://picsum.photos/seed/trend6/200/200" }
            ].map((item) => (
              <div key={item.id} className={styles.trendingCard}>
                <div className={styles.trendingCardContent}>
                  <div className={styles.trendingHeader}>
                    <span className={styles.trendingNumber}>{item.id}</span>
                    <div className={styles.trendingUser}>
                      <div className={styles.trendingAvatarSmall} />
                      <span>{item.author}</span>
                    </div>
                  </div>
                  <h3 className={styles.trendingTitle}>{item.title}</h3>
                  <span className={styles.trendingMeta}>{item.time} • 4 min read</span>
                </div>
                <img src={item.image} alt={item.title} className={styles.trendingImage} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className={styles.content}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Fresh Ink</h2>
            <p className={styles.sectionSubtitle}>The latest thinking from our community.</p>
          </div>

          <div className={styles.blogLayout}>
            {/* Featured Post */}
            {MOCK_BLOGS.length > 0 && (
              <div className={styles.featuredPost}>
                <div className={styles.featuredImageWrapper}>
                  <img src={MOCK_BLOGS[0].image} alt={MOCK_BLOGS[0].title} className={styles.featuredImage} />
                </div>
                <div className={styles.featuredContent}>
                  <div className={styles.featuredMeta}>
                    <span className={styles.featuredCategory}>{MOCK_BLOGS[0].category}</span>
                    <span className={styles.featuredDate}>{MOCK_BLOGS[0].date}</span>
                  </div>
                  <h3 className={styles.featuredTitle}>{MOCK_BLOGS[0].title}</h3>
                  <p className={styles.featuredExcerpt}>{MOCK_BLOGS[0].excerpt}</p>
                  <div className={styles.featuredFooter}>
                    <span>{MOCK_BLOGS[0].readTime} read</span>
                    <button className={styles.featuredBtn}>Read Article</button>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Grid */}
            <div className={styles.grid}>
              {MOCK_BLOGS.slice(1).map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className="container">
          <div className={styles.newsletterContainer}>

            <div className={styles.newsletterTextSide}>
              <h2 className={styles.newsletterTitle}>The Weekly Digest</h2>
              <p className={styles.newsletterText}>
                Curated stories on design, culture, and tech. Delivered every Sunday.
              </p>
            </div>

            <div className={styles.newsletterFormSide}>
              <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={styles.newsletterInput}
                />
                <button type="submit" className={styles.subscribeBtn}>
                  Subscribe
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
