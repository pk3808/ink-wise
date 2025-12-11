"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './CommentModal.module.css';

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

interface CommentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CommentModal({ isOpen, onClose }: CommentModalProps) {
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
    const [newComment, setNewComment] = useState("");
    const listRef = useRef<HTMLDivElement>(null);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

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

        // Scroll to top
        if (listRef.current) {
            listRef.current.scrollTop = 0;
        }
    };

    return (
        <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
            <div className={styles.drawer}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Responses ({comments.length})</h2>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close comments">
                        ✕
                    </button>
                </div>

                <div className={styles.commentList} ref={listRef}>
                    {comments.map((comment) => (
                        <div key={comment.id} className={styles.comment}>
                            <div className={styles.avatar}>{comment.avatar}</div>
                            <div className={styles.body}>
                                <div className={styles.authorMeta}>
                                    <span className={styles.authorName}>{comment.author}</span>
                                    <span className={styles.timestamp}>{comment.date}</span>
                                </div>
                                <p className={styles.text}>{comment.text}</p>
                            </div>
                        </div>
                    ))}

                    {comments.length === 0 && (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>
                            No comments yet. Be the first to share your thoughts.
                        </p>
                    )}
                </div>

                <div className={styles.inputArea}>
                    <textarea
                        className={styles.textarea}
                        placeholder="What are your thoughts?"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        className={styles.submitBtn}
                        disabled={!newComment.trim()}
                        onClick={handleSubmit}
                    >
                        Respond
                    </button>
                </div>
            </div>
            {/* Click outside to close */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 999 }} onClick={onClose}></div>
        </div>
    );
}
