"use client";

import React from 'react';
import { X, Heart, UserPlus, MessageSquare, Bell, CheckCircle2, Trash2 } from 'lucide-react';
import styles from './NotificationDrawer.module.css';

export interface Notification {
    id: string;
    type: 'like' | 'follow' | 'comment' | 'system';
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    userAvatar?: string;
}

interface NotificationDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    notifications: Notification[];
    onMarkAllRead: () => void;
    onClearAll: () => void;
}

export default function NotificationDrawer({
    isOpen,
    onClose,
    notifications,
    onMarkAllRead,
    onClearAll
}: NotificationDrawerProps) {
    if (!isOpen) return null;

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'like': return <Heart size={16} fill="#FF2D55" stroke="#FF2D55" />;
            case 'follow': return <UserPlus size={16} color="#34C759" />;
            case 'comment': return <MessageSquare size={16} color="#5856D6" />;
            default: return <Bell size={16} color="#FF9500" />;
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.drawer} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.titleGroup}>
                        <h3>Notifications</h3>
                        {notifications.length > 0 && <span className={styles.badge}>{notifications.filter(n => !n.isRead).length} New</span>}
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {notifications.length > 0 && (
                    <div className={styles.actions}>
                        <button onClick={onMarkAllRead} className={styles.actionBtn}>
                            <CheckCircle2 size={16} /> Mark all read
                        </button>
                        <button onClick={onClearAll} className={styles.actionBtn}>
                            <Trash2 size={16} /> Clear all
                        </button>
                    </div>
                )}

                <div className={styles.list}>
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                            <div key={notification.id} className={`${styles.item} ${!notification.isRead ? styles.unread : ''}`}>
                                <div className={styles.itemHeader}>
                                    <div className={styles.typeIcon}>{getIcon(notification.type)}</div>
                                    <span className={styles.time}>{notification.time}</span>
                                    {!notification.isRead && <div className={styles.unreadDot} />}
                                </div>
                                <div className={styles.content}>
                                    <p className={styles.itemTitle}>{notification.title}</p>
                                    <p className={styles.itemMessage}>{notification.message}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <Bell size={48} className={styles.emptyIcon} />
                            <p className={styles.emptyTitle}>No notifications yet</p>
                            <p className={styles.emptyDesc}>We'll notify you when something important happens.</p>
                        </div>
                    )}
                </div>

                <div className={styles.footer}>
                    <button className={styles.seeAllBtn}>See all notifications</button>
                </div>
            </div>
        </div>
    );
}
