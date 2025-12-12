"use client";

import React, { useRef, useEffect } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import styles from './page.module.css';

interface EditorBlockProps {
    id: string;
    html: string;
    tag: string;
    updatePage: (id: string, html: string) => void;
    addBlock: (id: string, ref: React.MutableRefObject<any>) => void;
    deleteBlock: (id: string, ref: React.MutableRefObject<any>) => void;
    placeholder?: string;
    onFocus: () => void;
}

export default function EditorBlock({
    id,
    html,
    tag,
    updatePage,
    addBlock,
    deleteBlock,
    placeholder,
    onFocus
}: EditorBlockProps) {
    const contentEditable = useRef<HTMLElement>(null);

    const handleChange = (e: ContentEditableEvent) => {
        updatePage(id, e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === '/') {
            // Trigger slash menu (future implementation)
        }
        if (e.key === 'Enter') {
            if (!e.shiftKey) {
                e.preventDefault();
                addBlock(id, contentEditable as React.MutableRefObject<any>);
            }
        }
        if (e.key === 'Backspace') {
            // Check DOM directly to avoid state lag
            const currentText = contentEditable.current?.innerText || '';
            const isEmpty = currentText.replace(/\n/g, '').trim() === '';

            if (isEmpty) {
                e.preventDefault();
                deleteBlock(id, contentEditable as React.MutableRefObject<any>);
            }
        }
    };

    const Tag = tag as keyof JSX.IntrinsicElements;

    return (
        <div className={styles.blockWrapper}>
            {/* Hover Actions (Drag handle, + button) could go here */}
            <ContentEditable
                id={`block-${id}`}
                innerRef={contentEditable as any} // Cast to any to bypass strict ref mismatch
                html={html}
                tagName={tag}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={onFocus}
                className={styles.block}
                data-placeholder={placeholder}
            />
        </div>
    );
}
