import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { Twitter, Github, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>

                {/* Top Section: Brand & Grid */}
                <div className={styles.grid}>

                    {/* Brand Column */}
                    <div className={styles.brandCol}>
                        <div className={styles.logo}>
                            <img src="/inkwise.png" alt="Pensieri Logo" style={{ width: '32px', height: 'auto', marginRight: '8px' }} />
                            <span className={styles.logoText}>Pensieri.</span>
                        </div>
                        <p className={styles.tagline}>
                            A sanctuary for thoughtful writing and deep reading. Built for those who value clarity over clutter.
                        </p>
                        <div className={styles.socials}>
                            <a href="#" className={styles.socialLink} aria-label="Twitter"><Twitter size={20} /></a>
                            <a href="#" className={styles.socialLink} aria-label="GitHub"><Github size={20} /></a>
                            <a href="#" className={styles.socialLink} aria-label="LinkedIn"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className={styles.linksWrapper}>
                        <div className={styles.linkCol}>
                            <h4 className={styles.colTitle}>Discover</h4>
                            <ul className={styles.linkList}>
                                <li><Link href="/category/technology">Technology</Link></li>
                                <li><Link href="/category/design">Design</Link></li>
                                <li><Link href="/category/culture">Culture</Link></li>
                                <li><Link href="/category/self">Self</Link></li>
                            </ul>
                        </div>

                        <div className={styles.linkCol}>
                            <h4 className={styles.colTitle}>Company</h4>
                            <ul className={styles.linkList}>
                                <li><Link href="/about">About</Link></li>
                                <li><Link href="/careers">Careers</Link></li>
                                <li><Link href="/blog">Changelog</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                            </ul>
                        </div>

                        <div className={styles.linkCol}>
                            <h4 className={styles.colTitle}>Legal</h4>
                            <ul className={styles.linkList}>
                                <li><Link href="/privacy">Privacy Policy</Link></li>
                                <li><Link href="/terms">Terms of Service</Link></li>
                                <li><Link href="/cookies">Cookie Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className={styles.bottom}>
                    <p className={styles.copyright}>© 2025 Pensieri Inc. All rights reserved.</p>
                    <p className={styles.madeWith}>
                        Made with <Heart size={14} className={styles.heart} /> in Digital Void
                    </p>
                </div>

            </div>
        </footer>
    );
}
