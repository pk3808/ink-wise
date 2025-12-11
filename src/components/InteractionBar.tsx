"use client";

import React, { useState } from 'react';
import styles from './InteractionBar.module.css';

export default function InteractionBar() {
    const [inkCount, setInkCount] = useState(124);
    const [isLiked, setIsLiked] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showShareTooltip, setShowShareTooltip] = useState(false);

    const handleInk = () => {
        setInkCount(prev => prev + 1);
        setIsLiked(true);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 600);
    };

    const handleShare = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setShowShareTooltip(true);
            setTimeout(() => setShowShareTooltip(false), 2000);
        }
    };

    const handleCommentClick = () => {
        const commentSection = document.getElementById('comments');
        if (commentSection) {
            commentSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.bar}>
            {/* Like / Ink Group */}
            <div className={styles.group}>
                <button
                    className={`${styles.btn} ${styles.inkBtn} ${isLiked ? styles.active : ''} ${isAnimating ? styles.animating : ''}`}
                    onClick={handleInk}
                    aria-label="Give Ink"
                >
                    {/* Ink Bottle Icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                        {isLiked ? (
                            <path d="M12 21a5 5 0 0 0 .1-9.9" fill="currentColor" opacity="0.5" />
                        ) : null}
                    </svg>
                    <span className={styles.splat}></span>
                </button>
                <span className={styles.count}>{inkCount}</span>
            </div>

            <div className={styles.divider}></div>

            {/* Comment Group */}
            <div className={styles.group}>
                <button className={styles.btn} onClick={handleCommentClick} aria-label="Comments">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
                <span className={styles.count}>4</span>
            </div>

            <div className={styles.divider}></div>

            {/* Share Group */}
            <div className={styles.group}>
                <button className={styles.btn} onClick={handleShare} aria-label="Share">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    {showShareTooltip && (
                        <div className={`${styles.shareTooltip} ${styles.show}`}>
                            Copied!
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
}
