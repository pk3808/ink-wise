"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import { Bold, Italic, Underline } from 'lucide-react';

export default function BubbleMenu() {
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleSelectionChange = () => {
            const selection = window.getSelection();

            if (!selection || selection.isCollapsed) {
                setPosition(null);
                return;
            }

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Should only show if selection is within the editor
            // simplified check: if selection is not empty

            setPosition({
                top: rect.top - 50, // Position above text
                left: rect.left + rect.width / 2 // Center horizontally
            });
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        return () => document.removeEventListener('selectionchange', handleSelectionChange);
    }, []);

    const handleFormat = (command: string) => {
        document.execCommand(command, false);
        // Keep menu open/update state if needed, usually execCommand preserves selection
    };

    if (!position) return null;

    return (
        <div
            className={styles.bubbleMenu}
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform: 'translateX(-50%)'
            }}
            ref={menuRef}
            onMouseDown={(e) => e.preventDefault()} // Prevent losing focus
        >
            <button className={styles.bubbleBtn} onClick={() => handleFormat('bold')}>
                <Bold size={16} />
            </button>
            <button className={styles.bubbleBtn} onClick={() => handleFormat('italic')}>
                <Italic size={16} />
            </button>
            <button className={styles.bubbleBtn} onClick={() => handleFormat('underline')}>
                <Underline size={16} />
            </button>
        </div>
    );
}
