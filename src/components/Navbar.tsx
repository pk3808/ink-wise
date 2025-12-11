"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import styles from "./Navbar.module.css";
import React from 'react';

const SEARCH_ITEMS = [
    { title: "The Future of Writing", href: "/blog/future-of-writing", icon: "📝", meta: "5 min read", rating: 4.8 },
    { title: "Minimalism in Design", href: "/blog/minimalism-in-design", icon: "🎨", meta: "7 min read", rating: 4.9 },
    { title: "Cultivating Deep Reading", href: "/blog/reading-habits", icon: "📚", meta: "4 min read", rating: 4.7 },
    { title: "Sustainable Architecture", href: "/blog/modern-architecture", icon: "🏗️", meta: "6 min read", rating: 4.6 },
    { title: "Technology", href: "/category/technology", icon: "💻", meta: "120 Stories" },
    { title: "Design", href: "/category/design", icon: "🎨", meta: "85 Stories" },
    { title: "Culture", href: "/category/culture", icon: "🌍", meta: "64 Stories" },
    { title: "Business", href: "/category/business", icon: "💼", meta: "92 Stories" },
];

interface NavbarProps {
    fullWidth?: boolean;
}

export default function Navbar({ fullWidth = false }: NavbarProps) {
    const { theme, setTheme, readingIntensity, setReadingIntensity } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    // Search State
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isSearchFocused, setIsSearchFocused] = React.useState(false);
    const searchRef = React.useRef<HTMLDivElement>(null);

    // Handle click outside to close search
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Lock body scroll when menu is open
    React.useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    return (
        <nav className={styles.nav}>
            <div className={fullWidth ? styles.fullContainer : `container ${styles.container}`}>
                <div className={styles.topBar}>
                    <Link href="/" className={styles.logo}>
                        <img src="/inkwise.png" alt="Inkwise Logo" className={styles.logoImage} />
                        Inkwise<span className={styles.dot}>.</span>
                    </Link>

                    {/* Desktop Nav Items */}
                    <div className={styles.desktopNav}>
                        <div className={styles.links}>
                            <Link href="/" className={styles.link}>Explore</Link>
                            <Link href="/about" className={styles.link}>About</Link>
                            <Link href="/admin" className={styles.link}>Admin</Link>
                        </div>

                        {/* Search Bar */}
                        <div className={styles.searchContainer} ref={searchRef}>
                            <div className={styles.searchInputWrapper}>
                                <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                />
                                {searchQuery && (
                                    <button className={styles.searchClearBtn} onClick={() => setSearchQuery('')}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Dropdown Results */}
                            {isSearchFocused && (
                                <div className={styles.searchDropdown}>
                                    {!searchQuery ? (
                                        /* Default View (No Query) */
                                        <>
                                            <div className={styles.dropdownHeader}>
                                                <span>Recent</span>
                                                <span style={{ cursor: 'pointer' }}>See all</span>
                                            </div>

                                            <div className={styles.dropdownSection}>
                                                <div className={styles.sectionTitle}>Trending Articles</div>
                                                <div className={styles.resultList}>
                                                    <Link href="/blog/future-of-writing" className={styles.resultItem}>
                                                        <div className={styles.resultIcon}>📝</div>
                                                        <div className={styles.resultContent}>
                                                            <div className={styles.resultTitle}>The Future of Writing</div>
                                                            <div className={styles.resultMeta}>
                                                                <span className={styles.metaRating}>★ 4.8</span>
                                                                <span>• 5 min read</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link href="/blog/minimalism-in-design" className={styles.resultItem}>
                                                        <div className={styles.resultIcon}>🎨</div>
                                                        <div className={styles.resultContent}>
                                                            <div className={styles.resultTitle}>Minimalism in Design</div>
                                                            <div className={styles.resultMeta}>
                                                                <span className={styles.metaRating}>★ 4.9</span>
                                                                <span>• 7 min read</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className={styles.dropdownSection} style={{ paddingTop: 0 }}>
                                                <div className={styles.sectionTitle}>Topics</div>
                                                <div className={styles.resultList}>
                                                    <div className={styles.resultItem}>
                                                        <div className={styles.resultIcon}>💻</div>
                                                        <div className={styles.resultContent}>
                                                            <div className={styles.resultTitle}>Technology</div>
                                                            <div className={styles.resultMeta}>120 Stories</div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.resultItem}>
                                                        <div className={styles.resultIcon}>🌍</div>
                                                        <div className={styles.resultContent}>
                                                            <div className={styles.resultTitle}>Culture</div>
                                                            <div className={styles.resultMeta}>64 Stories</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        /* Filtered View (With Query) */
                                        <div className={styles.dropdownSection}>
                                            <div className={styles.sectionTitle}>Search Results</div>
                                            <div className={styles.resultList}>
                                                {SEARCH_ITEMS.filter(item =>
                                                    item.title.toLowerCase().includes(searchQuery.toLowerCase())
                                                ).length > 0 ? (
                                                    SEARCH_ITEMS.filter(item =>
                                                        item.title.toLowerCase().includes(searchQuery.toLowerCase())
                                                    ).map((item, index) => (
                                                        <Link href={item.href} key={index} className={styles.resultItem}>
                                                            <div className={styles.resultIcon}>{item.icon}</div>
                                                            <div className={styles.resultContent}>
                                                                <div className={styles.resultTitle}>{item.title}</div>
                                                                <div className={styles.resultMeta}>
                                                                    {item.rating && <span className={styles.metaRating}>★ {item.rating} • </span>}
                                                                    <span>{item.meta}</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                                        No results found for &quot;{searchQuery}&quot;
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className={styles.actions}>
                            <div className={styles.themeGroup}>
                                {theme === 'reading' && (
                                    <div className={styles.intensityControl} title="Adjust Reading Mode Intensity">
                                        <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Aa</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={readingIntensity}
                                            onChange={(e) => setReadingIntensity(Number(e.target.value))}
                                            className={styles.rangeInput}
                                            aria-label="Reading intensity"
                                        />
                                        <span style={{ fontSize: '1rem', fontWeight: 600 }}>Aa</span>
                                    </div>
                                )}

                                <div className={styles.themeToggle}>
                                    <button onClick={() => setTheme('light')} className={`${styles.themeBtn} ${theme === 'light' ? styles.active : ''}`} title="Light Mode">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                                    </button>
                                    <button onClick={() => setTheme('dark')} className={`${styles.themeBtn} ${theme === 'dark' ? styles.active : ''}`} title="Dark Mode">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                                    </button>
                                    <button onClick={() => setTheme('reading')} className={`${styles.themeBtn} ${theme === 'reading' ? styles.active : ''}`} title="Reading Mode">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                    </button>
                                </div>
                            </div>
                            <Link href="/login" className={styles.loginBtn} title="Sign In">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </Link>
                            <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                                    <line x1="6" y1="1" x2="6" y2="4"></line>
                                    <line x1="10" y1="1" x2="10" y2="4"></line>
                                    <line x1="14" y1="1" x2="14" y2="4"></line>
                                </svg>
                                Buy Me Coffee
                            </button>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={styles.mobileToggle}
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <span className={styles.menuLabel}>Menu</span>
                    </button>
                </div>

                {/* Mobile Fullscreen Overlay */}
                <div className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.open : ''}`}>
                    <div className={styles.mobileHeader}>
                        <Link href="/" className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}>
                            Inkwise<span className={styles.dot}>.</span>
                        </Link>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            ✕
                        </button>
                    </div>

                    <div className={styles.mobileContent}>
                        <nav className={styles.mobileNav}>
                            <Link href="/" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Explore</Link>
                            <Link href="/about" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                            <Link href="/admin" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
                        </nav>

                        <div className={styles.mobileActions}>
                            <div className={styles.mobileThemeGroup}>
                                <p className={styles.mobileLabel}>Appearance</p>
                                <div className={styles.themeToggleLarge}>
                                    <button onClick={() => setTheme('light')} className={`${styles.themeBtnLarge} ${theme === 'light' ? styles.active : ''}`}>
                                        <span>Light</span>
                                    </button>
                                    <button onClick={() => setTheme('dark')} className={`${styles.themeBtnLarge} ${theme === 'dark' ? styles.active : ''}`}>
                                        <span>Dark</span>
                                    </button>
                                    <button onClick={() => setTheme('reading')} className={`${styles.themeBtnLarge} ${theme === 'reading' ? styles.active : ''}`}>
                                        <span>Reading</span>
                                    </button>
                                </div>
                                {theme === 'reading' && (
                                    <div className={styles.mobileIntensity}>
                                        <span>Comfort</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={readingIntensity}
                                            onChange={(e) => setReadingIntensity(Number(e.target.value))}
                                            className={styles.rangeInputLarge}
                                        />
                                    </div>
                                )}
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
