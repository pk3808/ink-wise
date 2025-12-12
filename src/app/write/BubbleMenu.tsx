"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import { Bold, Italic, Underline, Sparkles, X, Check } from 'lucide-react';

export default function BubbleMenu() {
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
    const [showRefineMenu, setShowRefineMenu] = useState(false);
    const [isRefining, setIsRefining] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleSelectionChange = () => {
            // If refining, don't move or close
            if (showRefineMenu || isRefining) return;

            const selection = window.getSelection();

            if (!selection || selection.isCollapsed) {
                setPosition(null);
                setShowRefineMenu(false);
                return;
            }

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            if (rect.width === 0) return; // Hidden selection

            setPosition({
                top: rect.top - 50, // Position above text
                left: rect.left + rect.width / 2 // Center horizontally
            });
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        return () => document.removeEventListener('selectionchange', handleSelectionChange);
    }, [showRefineMenu, isRefining]);

    const handleFormat = (command: string) => {
        document.execCommand(command, false);
    };

    const handleRefine = async (mode: string) => {
        setIsRefining(true);
        const selection = window.getSelection();
        if (!selection) return;

        const text = selection.toString();

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'refine',
                    content: text,
                    context: { mode }
                })
            });

            const data = await res.json();
            if (data.result) {
                document.execCommand('insertText', false, data.result);
            }
        } catch (err) {
            console.error("Refine error", err);
            alert("Failed to refine text");
        } finally {
            setIsRefining(false);
            setShowRefineMenu(false);
            setPosition(null); // Close menu
        }
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
            {!showRefineMenu ? (
                <>
                    <button className={styles.bubbleBtn} onClick={() => handleFormat('bold')}>
                        <Bold size={16} />
                    </button>
                    <button className={styles.bubbleBtn} onClick={() => handleFormat('italic')}>
                        <Italic size={16} />
                    </button>
                    <button className={styles.bubbleBtn} onClick={() => handleFormat('underline')}>
                        <Underline size={16} />
                    </button>
                    <div className={styles.bubbleDivider} />
                    <button
                        className={styles.bubbleBtn}
                        onClick={() => setShowRefineMenu(true)}
                        title="AI Refine"
                    >
                        <Sparkles size={16} fill={isRefining ? "currentColor" : "none"} />
                    </button>
                </>
            ) : (
                <div className={styles.refineMenu}>
                    {isRefining ? (
                        <span className={styles.loadingText}>Refining...</span>
                    ) : (
                        <>
                            <button className={styles.refineOption} onClick={() => handleRefine('grammar')}>
                                Fix Grammar
                            </button>
                            <button className={styles.refineOption} onClick={() => handleRefine('shorten')}>
                                Shorten
                            </button>
                            <button className={styles.refineOption} onClick={() => handleRefine('professional')}>
                                Professional
                            </button>
                            <button className={styles.closeRefineBtn} onClick={() => setShowRefineMenu(false)}>
                                <X size={14} />
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
