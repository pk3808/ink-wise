"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { X, Check, Sparkles, RefreshCw, Copy } from 'lucide-react';

interface AIModalProps {
    originalText: string;
    fullText?: string;
    onClose: () => void;
    onReplace: (newText: string) => void;
    onTitleSelect?: (title: string) => void;
}

export default function AIModal({ originalText, fullText, onClose, onReplace, onTitleSelect }: AIModalProps) {
    const [refinedText, setRefinedText] = useState(originalText);
    const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<'refine' | 'title'>('refine');
    // If originalText is empty but fullText exists, maybe auto-switch to title mode? 
    // Or just default to refine and let user switch.


    // Auto-generate on open if it's a short text, or wait for user?
    // User wants "refined content" shown. Let's auto-trigger a "General Improvement" on load
    // OR just show options first. User said "clicked gives... refined content".
    // I will trigger a default refinement on mount for that "magic" feel, 
    // but maybe better to let them choose *how* to refine first to save calls.
    // Let's go with "Select Option" first for better UX/Cost, or a "Quick Polish" default.
    // I'll leave the text as is initially (editable) and let them click buttons.

    const handleGenerateTitles = async () => {
        setIsLoading(true);
        setMode('title');
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'title',
                    content: fullText || originalText,
                })
            });
            const data = await res.json();
            if (data.result) {
                const titles = data.result.split('\n').filter((t: string) => t.trim().length > 0);
                setTitleSuggestions(titles);
            }
        } catch (e) {
            console.error(e);
            alert("AI Error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefine = async (refineMode: string) => {
        setIsLoading(true);
        setMode('refine');
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'refine',
                    content: originalText,
                    context: { mode: refineMode }
                })
            });
            const data = await res.json();
            if (data.result) {
                setRefinedText(data.result);
            }
        } catch (e) {
            console.error(e);
            alert("AI Error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.aiModalOverlay}>
            <div className={styles.aiModal}>
                <div className={styles.aiModalHeader}>
                    <div className={styles.aiModalTitle}>
                        <Sparkles size={20} className={styles.aiIconPulse} />
                        <span>AI Muse</span>
                    </div>
                    <button onClick={onClose} className={styles.iconBtn}>
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.aiModalBody}>
                    <div className={styles.aiActions}>
                        <button className={styles.aiActionBtn} onClick={() => handleRefine('grammar')}>
                            Fix Grammar
                        </button>
                        <button className={styles.aiActionBtn} onClick={() => handleRefine('professional')}>
                            Make Professional
                        </button>
                        <button className={styles.aiActionBtn} onClick={() => handleRefine('shorten')}>
                            Shorten
                        </button>
                        <button className={styles.aiActionBtn} onClick={() => handleRefine('expand')}>
                            Expand
                        </button>
                        {onTitleSelect && (
                            <button className={styles.aiActionBtn} style={{ borderColor: '#6366f1', color: '#6366f1' }} onClick={handleGenerateTitles}>
                                Generate Titles
                            </button>
                        )}
                    </div>

                    <div className={styles.aiEditorArea}>
                        {isLoading ? (
                            <div className={styles.aiLoading}>
                                <RefreshCw className={styles.spin} size={24} />
                                <p>{mode === 'title' ? 'Brainstorming titles...' : 'Refining your thoughts...'}</p>
                            </div>
                        ) : mode === 'title' ? (
                            <div className={styles.aiTitleList} style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                                {titleSuggestions.map((title, idx) => (
                                    <button
                                        key={idx}
                                        className={styles.aiTitleOption}
                                        style={{
                                            textAlign: 'left',
                                            padding: '0.8rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border)',
                                            background: 'var(--bg-primary)',
                                            cursor: 'pointer',
                                            color: 'var(--text-primary)',
                                            fontSize: '1rem'
                                        }}
                                        onClick={() => {
                                            if (onTitleSelect) {
                                                onTitleSelect(title.replace(/^["']|["']$/g, '')); // Strip quotes
                                                onClose();
                                            }
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#6366f1'}
                                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                                    >
                                        {title}
                                    </button>
                                ))}
                                {titleSuggestions.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>Click "Generate Titles" to get started.</p>}
                            </div>
                        ) : (
                            <textarea
                                className={styles.aiTextarea}
                                value={refinedText}
                                onChange={(e) => setRefinedText(e.target.value)}
                                placeholder="Refined text will appear here. You can also edit this manually."
                            />
                        )}
                    </div>
                </div>

                {mode === 'refine' && (
                    <div className={styles.aiModalFooter}>
                        <div className={styles.aiFooterLeft}>
                            <span className={styles.diffIndicator}>
                                {originalText === refinedText ? 'No changes' : 'Text modified'}
                            </span>
                        </div>
                        <div className={styles.aiFooterRight}>
                            <button onClick={onClose} className={styles.btnSecondary}>
                                Discard
                            </button>
                            <button
                                onClick={() => onReplace(refinedText)}
                                className={styles.btnPrimary}
                                disabled={isLoading}
                            >
                                <Check size={16} style={{ marginRight: 8 }} />
                                Replace Content
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
