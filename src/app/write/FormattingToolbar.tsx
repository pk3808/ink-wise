"use client";

import React from 'react';
import styles from './page.module.css';
import {
    Bold, Italic, Underline,
    Heading1, Heading2, Quote,
    List, ListOrdered, Link as LinkIcon,
    Type
} from 'lucide-react';

interface FormattingToolbarProps {
    onToggleBlockType: (tag: string) => void;
    activeTag: string;
}

export default function FormattingToolbar({ onToggleBlockType, activeTag }: FormattingToolbarProps) {

    const handleFormat = (command: string, value?: string) => {
        document.execCommand(command, false, value);
    };

    return (
        <div className={styles.toolbar}>
            {/* Block Types */}
            <div className={styles.toolbarGroup}>
                <button
                    className={`${styles.toolbarBtn} ${activeTag === 'p' ? styles.active : ''}`}
                    onClick={() => onToggleBlockType('p')}
                    title="Normal Text"
                >
                    <Type size={18} />
                </button>
                <button
                    className={`${styles.toolbarBtn} ${activeTag === 'h1' ? styles.active : ''}`}
                    onClick={() => onToggleBlockType('h1')}
                    title="Heading 1"
                >
                    <Heading1 size={18} />
                </button>
                <button
                    className={`${styles.toolbarBtn} ${activeTag === 'h2' ? styles.active : ''}`}
                    onClick={() => onToggleBlockType('h2')}
                    title="Heading 2"
                >
                    <Heading2 size={18} />
                </button>
                <button
                    className={`${styles.toolbarBtn} ${activeTag === 'blockquote' ? styles.active : ''}`}
                    onClick={() => onToggleBlockType('blockquote')}
                    title="Quote"
                >
                    <Quote size={18} />
                </button>
            </div>

            <div className={styles.toolbarSeparator} />

            {/* Inline Formatting */}
            <div className={styles.toolbarGroup}>
                <button className={styles.toolbarBtn} onClick={() => handleFormat('bold')} title="Bold">
                    <Bold size={18} />
                </button>
                <button className={styles.toolbarBtn} onClick={() => handleFormat('italic')} title="Italic">
                    <Italic size={18} />
                </button>
                <button className={styles.toolbarBtn} onClick={() => handleFormat('underline')} title="Underline">
                    <Underline size={18} />
                </button>
            </div>

            <div className={styles.toolbarSeparator} />

            {/* Lists & Extras */}
            <div className={styles.toolbarGroup}>
                <button className={styles.toolbarBtn} onClick={() => handleFormat('insertUnorderedList')} title="Bullet List">
                    <List size={18} />
                </button>
                <button className={styles.toolbarBtn} onClick={() => handleFormat('insertOrderedList')} title="Numbered List">
                    <ListOrdered size={18} />
                </button>
                {/* Link logic usually requires a prompt or UI, simple prompt for MVP */}
                <button
                    className={styles.toolbarBtn}
                    onClick={() => {
                        const url = prompt('Enter URL:');
                        if (url) handleFormat('createLink', url);
                    }}
                    title="Link"
                >
                    <LinkIcon size={18} />
                </button>
            </div>
        </div>
    );
}
