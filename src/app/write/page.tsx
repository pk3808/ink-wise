"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import styles from './page.module.css';
import { ArrowLeft, Image as ImageIcon, MoreHorizontal, X, Sparkles, Save } from 'lucide-react';
import EditorBlock from './EditorBlock';
import Dropdown from './Dropdown';
import BubbleMenu from './BubbleMenu';
import FormattingToolbar from './FormattingToolbar';
import AIModal from './AIModal';

// Simple ID generator if uuid not available
const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const TOPIC_OPTIONS = [
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'culture', label: 'Culture' },
    { value: 'business', label: 'Business' },
    { value: 'life', label: 'Life' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'artificial-intelligence', label: 'Artificial Intelligence' },
    { value: 'programming', label: 'Programming' },
];

interface Block {
    id: string;
    html: string;
    tag: string;
}

export default function WritingPage() {
    const { theme } = useTheme();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // AI Modal State
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [aiContextText, setAiContextText] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Blocks State
    const [blocks, setBlocks] = useState<Block[]>([
        { id: uid(), html: '', tag: 'p' }
    ]);
    const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

    // Mock auto-save
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSaving(true);
            setTimeout(() => setIsSaving(false), 1000);
        }, 5000);
        return () => clearTimeout(timer);
    }, [title, blocks]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerImageUpload = () => {
        fileInputRef.current?.click();
    };

    const removeCoverImage = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering upload again
        setCoverImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };


    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = tagInput.trim();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                setTagInput('');
            }
        }
        if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
            setTags(tags.slice(0, -1));
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const updatePage = (id: string, html: string) => {
        setBlocks(prev => prev.map(b => b.id === id ? { ...b, html } : b));
    };

    const addBlock = (currentId: string, ref: React.MutableRefObject<any>) => {
        const newId = uid();
        setBlocks(prev => {
            const index = prev.findIndex(b => b.id === currentId);
            const newBlock = { id: newId, html: '', tag: 'p' };
            const newBlocks = [...prev];
            newBlocks.splice(index + 1, 0, newBlock);
            return newBlocks;
        });

        setTimeout(() => {
            const nextEl = document.getElementById(`block-${newId}`);
            if (nextEl) {
                nextEl.focus();
                setActiveBlockId(newId);
            }
        }, 0);
    };

    const deleteBlock = (currentId: string, ref: React.MutableRefObject<any>) => {
        setBlocks(prev => {
            const index = prev.findIndex(b => b.id === currentId);
            if (index <= 0) return prev; // Avoid deleting first block if only one

            const prevBlock = prev[index - 1];
            // Side effect: Focus previous
            setTimeout(() => {
                const prevEl = document.getElementById(`block-${prevBlock.id}`);
                if (prevEl) {
                    prevEl.focus();

                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(prevEl);
                    range.collapse(false);
                    sel?.removeAllRanges();
                    sel?.addRange(range);

                    setActiveBlockId(prevBlock.id);
                }
            }, 0);

            return prev.filter(b => b.id !== currentId);
        });
    };

    const toggleBlockType = (tag: string) => {
        if (!activeBlockId) return;
        setBlocks(blocks.map(b => b.id === activeBlockId ? { ...b, tag } : b));
    };

    const activeBlock = blocks.find(b => b.id === activeBlockId);
    const activeTag = activeBlock ? activeBlock.tag : 'p';

    return (
        <div className={styles.container}>
            {/* Minimal Header */}
            {/* Minimal Header */}
            <header className={styles.header}>
                <Link href="/admin" className={styles.backBtn}>
                    <ArrowLeft size={20} />
                    <span className={styles.backText}>Back to Dashboard</span>
                </Link>

                <div className={styles.headerActions}>
                    <span className={styles.saveStatus}>
                        {isSaving ? 'Saving...' : 'Saved'}
                    </span>
                    <button className={`${styles.actionBtn} ${styles.btnSecondary}`} title="Save Draft">
                        <Save size={18} />
                        <span className={styles.saveText}>Save Draft</span>
                    </button>
                    <button className={`${styles.actionBtn} ${styles.btnPrimary}`}>
                        Publish
                    </button>

                </div>
            </header>

            {/* Bubble Menu for Rich Text */}
            <BubbleMenu />

            {/* Writing Area */}
            <main className={styles.editorContainer}>

                {/* Cover Image */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    style={{ display: 'none' }}
                />

                {coverImage ? (
                    <div className={styles.coverImagePreviewGroup}>
                        <img src={coverImage} alt="Cover" className={styles.coverImage} />
                        <button className={styles.removeCoverBtn} onClick={removeCoverImage} title="Remove Cover">
                            <X size={18} />
                        </button>
                    </div>
                ) : (
                    <div className={styles.coverImagePlaceholder} onClick={triggerImageUpload}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ImageIcon size={20} />
                            <span>Add Cover Image</span>
                        </div>
                    </div>
                )}

                {/* Title */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        className={styles.titleInput}
                        placeholder="Article Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {blocks.some(b => b.html.length > 50) && (
                        <button
                            className={styles.smartTitleBtn}
                            onClick={async () => {
                                const fullText = blocks.map(b => b.html).join('\n');
                                try {
                                    const res = await fetch('/api/generate', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ type: 'title', content: fullText })
                                    });
                                    const data = await res.json();
                                    if (data.result) {
                                        // Pick the first line of result as title
                                        const suggestions = data.result.split('\n');
                                        if (suggestions[0]) setTitle(suggestions[0].replace(/['"]/g, ''));
                                        // Optional: show others? For now just pick first.
                                    }
                                } catch (e) {
                                    console.error(e);
                                    alert("Could not generate title");
                                }
                            }}
                            title="Generate Smart Title"
                        >
                            <Sparkles size={18} />
                        </button>
                    )}
                </div>

                {/* Metadata Settings */}
                <div className={styles.metadata}>
                    <Dropdown
                        options={TOPIC_OPTIONS}
                        value={topic}
                        onChange={setTopic}
                        placeholder="Select Topic"
                    />

                    <div className={styles.tagInputContainer}>
                        {tags.map(tag => (
                            <span key={tag} className={styles.tagChip}>
                                #{tag}
                                <span className={styles.removeTag} onClick={() => removeTag(tag)}>×</span>
                            </span>
                        ))}
                        <input
                            type="text"
                            className={styles.addTagInput}
                            placeholder="Add tags... (Press Enter)"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                        />
                    </div>
                </div>

                {/* Toolbar - Sticky within flow */}
                <FormattingToolbar
                    onToggleBlockType={toggleBlockType}
                    activeTag={activeTag}
                />

                {/* Blocks */}
                {/* Blocks */}
                {blocks.map((block, index) => (
                    <EditorBlock
                        key={block.id}
                        id={block.id}
                        tag={block.tag}
                        html={block.html}
                        updatePage={updatePage}
                        addBlock={addBlock}
                        deleteBlock={deleteBlock}
                        onFocus={() => setActiveBlockId(block.id)}
                        placeholder={index === 0 && blocks.length === 1 ? "Tell your story..." : undefined}
                    />
                ))}
            </main>

            {/* AI FAB */}
            <button
                className={styles.aiFab}
                onClick={() => {
                    // Logic to grab text:
                    // 1. Selection
                    const selection = window.getSelection()?.toString();
                    if (selection && selection.length > 5) {
                        setAiContextText(selection);
                        setIsAIModalOpen(true);
                        return;
                    }

                    // 2. Active Block
                    const active = blocks.find(b => b.id === activeBlockId);
                    if (active && active.html.length > 10) {
                        setAiContextText(active.html.replace(/<[^>]*>?/gm, '')); // Strip HTML for AI
                        setIsAIModalOpen(true);
                        return;
                    }

                    // 3. Fallback: Full draft (limit for now)
                    alert("Please select some text or write a paragraph first!");
                }}
                title="Open AI Assistant"
            >
                <Sparkles size={24} className={styles.aiFabIcon} />
            </button>

            {isAIModalOpen && (
                <AIModal
                    originalText={aiContextText}
                    fullText={blocks.map(b => b.html).join('\n')}
                    onClose={() => setIsAIModalOpen(false)}
                    onTitleSelect={(newTitle) => setTitle(newTitle)}
                    onReplace={(newText) => {
                        // Replace logic
                        // If we selected text, execCommand is best
                        // But if we lost selection (modal opened), we might need to rely on block update
                        // Simplify: If opened from Block, update Block.

                        // For MVP: Re-focus and insert if selection existed, else update block
                        setIsAIModalOpen(false);

                        // Try block update first if no selection range preserved
                        if (activeBlockId) {
                            // Simple replace of block content for now (User agreed to "Refine Content")
                            // Ideally we'd map back to selection but that's complex for this step
                            updatePage(activeBlockId, newText);
                        }
                    }}
                />
            )}
        </div>
    );
}
