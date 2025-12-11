"use client";

import React, { useState, useRef } from 'react';
import styles from './CommentSection.module.css';


interface Comment {
    id: number;
    author: string;
    avatar: string;
    text: string;
    date: string;
}

const MOCK_COMMENTS: Comment[] = [
    { id: 1, author: "Alice Chen", avatar: "A", text: "This article completely changed my perspective on minimalism. Great read!", date: "2 hours ago" },
    { id: 2, author: "Marcus O.", avatar: "M", text: "The part about 'digital clutter' really resonated with me. I need to clean up my workspace.", date: "5 hours ago" },
    { id: 3, author: "Sarah Jenkins", avatar: "S", text: "Beautifully written. I love the typography choices on this site too.", date: "1 day ago" },
    { id: 4, author: "David K.", avatar: "D", text: "I disagree with the point about AI, but I appreciate the thoughtful argument.", date: "2 days ago" },
];

export default function CommentSection() {
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
    const [newComment, setNewComment] = useState("");
    const listRef = useRef<HTMLDivElement>(null);

    const handleSubmit = () => {
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Date.now(),
            author: "You",
            avatar: "Y",
            text: newComment,
            date: "Just now"
        };

        setComments([comment, ...comments]);
        setNewComment("");

        // Scroll to start
        if (listRef.current) {
            listRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    };

    const scrollNext = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
    };

    const scrollPrev = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ left: -350, behavior: 'smooth' });
        }
    };

    return (
        <section id="comments" className={styles.section}>
            <div className={styles.headerContainer}>
                <h3 className={styles.title}>Reflections & Thoughts ({comments.length})</h3>

                <div className={styles.inputArea}>
                    <label className={styles.inputLabel}>Join the conversation</label>
                    <textarea
                        className={styles.textarea}
                        placeholder="Write a thoughtful comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            className={styles.submitBtn}
                            disabled={!newComment.trim()}
                            onClick={handleSubmit}
                        >
                            Share Thought
                        </button>

                    </div>
                </div>
            </div>

            {/* Carousel Container */}
            <div className={styles.carouselContainer}>
                <button className={`${styles.navBtn} ${styles.navBtnPrev}`} onClick={scrollPrev} aria-label="Previous">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>

                <button className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={scrollNext} aria-label="Next">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>

                <div className={styles.commentList} ref={listRef}>
                    {comments.map((comment) => (
                        <div key={comment.id} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <div className={styles.avatarMock}>{comment.avatar}</div>
                                <div className={styles.authorMeta}>
                                    <span className={styles.author}>{comment.author}</span>
                                    <span className={styles.date}>{comment.date}</span>
                                </div>
                            </div>

                            <p className={styles.text}>{comment.text}</p>

                            <div className={styles.actions}>
                                <button className={styles.actionBtn}>Reply</button>
                                <button className={styles.actionBtn}>Like</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
