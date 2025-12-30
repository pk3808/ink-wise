"use client";

import React, { useState } from 'react';
import { X, UserPlus, UserMinus, Search } from 'lucide-react';
import styles from './FollowersModal.module.css';

interface User {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    isFollowing: boolean;
}

interface FollowersModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'followers' | 'following';
    data: User[];
}

export default function FollowersModal({
    isOpen,
    onClose,
    type,
    data
}: FollowersModalProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState(data);

    if (!isOpen) return null;

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.handle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleFollow = (id: string) => {
        setUsers(prev => prev.map(user =>
            user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
        ));
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.titleGroup}>
                        <h3>{type === 'followers' ? 'Followers' : 'Following'}</h3>
                        <span className={styles.count}>{users.length}</span>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.searchBar}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.userList}>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <div key={user.id} className={styles.userItem}>
                                <div
                                    className={styles.userInfo}
                                    onClick={() => window.location.href = `/u/${user.handle.replace('@', '')}`}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className={styles.avatarWrapper}>
                                        <img src={user.avatar} alt={user.name} className={styles.avatar} />
                                    </div>
                                    <div className={styles.userMeta}>
                                        <span className={styles.userName}>{user.name}</span>
                                        <span className={styles.userHandle}>{user.handle}</span>
                                    </div>
                                </div>
                                <button
                                    className={`${styles.followBtn} ${user.isFollowing ? styles.following : ''}`}
                                    onClick={() => toggleFollow(user.id)}
                                >
                                    {user.isFollowing ? (
                                        <>
                                            <UserMinus size={16} />
                                            <span>Unfollow</span>
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus size={16} />
                                            <span>Follow</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <p>No users found matching "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
