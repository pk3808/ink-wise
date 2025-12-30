"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './UserDropdown.module.css';
import { User, LogOut, UserMinus, ChevronRight } from 'lucide-react';

interface UserDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        name: string;
        email?: string;
        avatar?: string;
    };
    onLogout: () => void;
    onDeleteProfile: () => void;
}

export default function UserDropdown({ isOpen, onClose, user, onLogout, onDeleteProfile }: UserDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <div className={styles.header}>
                <div className={styles.userInfo}>
                    <img
                        src={user.avatar || "/default-avatar.png"}
                        alt={user.name}
                        className={styles.avatar}
                    />
                    <div className={styles.userDetails}>
                        <p className={styles.userName}>{user.name}</p>
                        <p className={styles.userEmail}>{user.email || "Reader"}</p>
                    </div>
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.menu}>
                <Link href="/profile" className={styles.menuItem} onClick={onClose}>
                    <div className={styles.menuIcon}>
                        <User size={18} />
                    </div>
                    <span>Profile</span>
                    <ChevronRight size={14} className={styles.arrow} />
                </Link>

                <button className={styles.menuItem} onClick={onLogout}>
                    <div className={styles.menuIcon}>
                        <LogOut size={18} />
                    </div>
                    <span>Logout</span>
                    <ChevronRight size={14} className={styles.arrow} />
                </button>

                <div className={styles.divider} />

                <button className={`${styles.menuItem} ${styles.danger}`} onClick={onDeleteProfile}>
                    <div className={styles.menuIcon}>
                        <UserMinus size={18} />
                    </div>
                    <span>Delete Profile</span>
                    <ChevronRight size={14} className={styles.arrow} />
                </button>
            </div>
        </div>
    );
}
