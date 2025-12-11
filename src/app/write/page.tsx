"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import styles from './page.module.css';
import { ArrowLeft, Image as ImageIcon, MoreHorizontal, X } from 'lucide-react';
import EditorBlock from './EditorBlock';
import Dropdown from './Dropdown';
import BubbleMenu from './BubbleMenu';
import FormattingToolbar from './FormattingToolbar';

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
        const newBlocks = blocks.map(b => b.id === id ? { ...b, html } : b);
        setBlocks(newBlocks);
    };

    const addBlock = (currentId: string, ref: React.MutableRefObject<any>) => {
        const newBlock = { id: uid(), html: '', tag: 'p' };
        const index = blocks.findIndex(b => b.id === currentId);

        const newBlocks = [...blocks];
        newBlocks.splice(index + 1, 0, newBlock);
        setBlocks(newBlocks);

        // Focus next block logic
        // Since we are setting state, we need to wait for render to focus.
        // In a Production app, we'd use a more robust focus manager.
        setTimeout(() => {
            const nextBlock = document.getElementById(newBlock.id); // We need to pass id to DOM in EditorBlock?
            // Actually, we can rely on React refs if we managed them in parent, 
            // but for dynamic lists, querySelector is easier for MVP.
            // Let's modify EditorBlock to accept an ID for the wrapper or contentEditable
        }, 0);
    };

    const deleteBlock = (currentId: string, ref: React.MutableRefObject<any>) => {
        const index = blocks.findIndex(b => b.id === currentId);
        if (index > 0) {
            const prevBlock = blocks[index - 1];
            const currentBlock = blocks[index];

            // Merge content if previous block is same type (optional, strict for now just delete)
            // Ideally: update prevBlock html += currentBlock html
            const newBlocks = blocks.filter(b => b.id !== currentId);
            setBlocks(newBlocks);

            // Focus previous
            // setTimeout logic similar to add
        }
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
            <header className={styles.header}>
                <Link href="/admin" className={styles.backBtn}>
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </Link>

                <div className={styles.headerActions}>
                    <span className={styles.saveStatus}>
                        {isSaving ? 'Saving...' : 'Saved'}
                    </span>
                    <button className={`${styles.actionBtn} ${styles.btnSecondary}`}>
                        Save Draft
                    </button>
                    <button className={`${styles.actionBtn} ${styles.btnPrimary}`}>
                        Publish
                    </button>
                    <button className={`${styles.actionBtn} ${styles.btnSecondary}`} style={{ padding: '0.5rem' }}>
                        <MoreHorizontal size={20} />
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
                <input
                    type="text"
                    className={styles.titleInput}
                    placeholder="Article Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

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
        </div>
    );
}
