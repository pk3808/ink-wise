"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './page.module.css';
import {
    Droplet,
    Crown,
    MapPin,
    Calendar,
    Share2,
    Instagram,
    Facebook,
    Linkedin,
    Twitter,
    UserPlus,
    UserMinus,
    ArrowLeft,
    BookOpen,
    TrendingUp
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';

// Mock data generator for public profiles
const getPublicUser = (handle: string) => ({
    name: handle.charAt(1).toUpperCase() + handle.slice(2).replace('_', ' '),
    handle: handle,
    email: `${handle.slice(1)}@example.com`,
    avatar: `https://i.pravatar.cc/150?u=${handle}`,
    bio: "Passionate writer and digital creator. Exploring the intersection of technology, design, and human experience through long-form stories.",
    location: "Global Nomad",
    followers: "4.2K",
    following: "382",
    inkScore: 88,
    isFollowing: false,
    posts: [
        {
            slug: "future-of-writing",
            title: "The Future of Digital Writing dealing with AI",
            excerpt: "How technology is reshaping the way we express our thoughts...",
            category: "Technology",
            date: "Dec 12, 2025",
            readTime: "5 min",
            image: "https://picsum.photos/seed/p1/800/400"
        },
        {
            slug: "minimalism-in-design",
            title: "Why Minimalism in UI is More Than Just a Trend",
            excerpt: "Exploring the psychological impact of clutter-free interfaces...",
            category: "Design",
            date: "Dec 10, 2025",
            readTime: "7 min",
            image: "https://picsum.photos/seed/p2/800/400"
        }
    ]
});

export default function PublicProfile() {
    const params = useParams();
    const router = useRouter();
    const handle = `@${params.handle}`;
    const [user, setUser] = useState<any>(null);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        // In a real app, fetch from API. Here we use mock.
        const userData = getPublicUser(handle);
        setUser(userData);
        setIsFollowing(userData.isFollowing);
    }, [handle]);

    if (!user) return null;

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <button className={styles.backBtn} onClick={() => router.back()}>
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>

                {/* Public Hero */}
                <div className={styles.dashboardHero}>
                    <div className={styles.avatarSection}>
                        <div className={styles.avatarWrapper}>
                            <img src={user.avatar} alt={user.name} className={styles.avatar} />
                        </div>
                    </div>
                    <div className={styles.infoSection}>
                        <div className={styles.nameHeader}>
                            <h1 className={styles.name}>{user.name}</h1>
                            <div className={styles.premiumBadge}>
                                <Crown size={14} fill="currentColor" />
                                <span>Author</span>
                            </div>
                        </div>
                        <p className={styles.handle}>{user.handle}</p>

                        <div className={styles.metadataRow}>
                            <div className={styles.metaItem}>
                                <MapPin size={16} />
                                <span>{user.location}</span>
                            </div>
                            <div className={styles.metaItem}>
                                <Calendar size={16} />
                                <span>Joined March 2024</span>
                            </div>
                        </div>

                        <div className={styles.bloggerStatsBar}>
                            <div className={styles.bloggerStat}>
                                <span className={styles.statNumber}>{user.followers}</span>
                                <span className={styles.statLabel}>Followers</span>
                            </div>
                            <div className={styles.bloggerStatDivider} />
                            <div className={styles.bloggerStat}>
                                <span className={styles.statNumber}>{user.following}</span>
                                <span className={styles.statLabel}>Following</span>
                            </div>
                            <div className={styles.bloggerStatDivider} />
                            <div className={styles.bloggerStat}>
                                <div className={styles.inkScoreWrapper}>
                                    <Droplet size={14} className={styles.inkScoreIcon} fill="currentColor" />
                                    <span className={styles.statNumber}>{user.inkScore}</span>
                                </div>
                                <span className={styles.statLabel}>Ink Score</span>
                            </div>
                        </div>

                        <p className={styles.bioText}>{user.bio}</p>

                        <div className={styles.heroActions}>
                            <button
                                className={`${styles.followBtn} ${isFollowing ? styles.following : ''}`}
                                onClick={() => setIsFollowing(!isFollowing)}
                            >
                                {isFollowing ? (
                                    <>
                                        <UserMinus size={18} />
                                        <span>Unfollow</span>
                                    </>
                                ) : (
                                    <>
                                        <UserPlus size={18} />
                                        <span>Follow</span>
                                    </>
                                )}
                            </button>

                            <div className={styles.socialRow}>
                                <a href="#" className={styles.socialIcon} title="Twitter"><Twitter size={20} /></a>
                                <a href="#" className={styles.socialIcon} title="LinkedIn"><Linkedin size={20} /></a>
                            </div>

                            <button className={styles.shareBtn}>
                                <Share2 size={16} />
                                Share
                            </button>
                        </div>
                    </div>
                </div>

                <main className={styles.contentSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            <BookOpen size={24} />
                            Published Stories
                        </h2>
                        <div className={styles.titleUnderline} />
                    </div>

                    <div className={styles.blogGrid}>
                        {user.posts.map((post: any) => (
                            <BlogCard key={post.slug} blog={post} />
                        ))}
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}
