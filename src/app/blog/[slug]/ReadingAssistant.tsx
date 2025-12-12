"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './ReadingAssistant.module.css';
import { Sparkles, MessageSquare, BookOpen, X, Send, User, Bot, ChevronUp } from 'lucide-react';

interface ReadingAssistantProps {
    title: string;
    content: string;
}

export default function ReadingAssistant({ title, content }: ReadingAssistantProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'summary' | 'chat'>('summary');
    const [summary, setSummary] = useState('');
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

    // Chat state
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([]);
    const [isChatLoading, setIsChatLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setIsOpen(!isOpen);

    const generateSummary = async () => {
        if (summary) return;
        setIsGeneratingSummary(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'summary',
                    content: content
                })
            });
            const data = await res.json();
            if (data.result) {
                setSummary(data.result);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsGeneratingSummary(false);
        }
    };

    const handleSendChat = async () => {
        if (!chatInput.trim()) return;

        const userMsg = chatInput;
        setChatInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsChatLoading(true);

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'chat',
                    content: content,
                    context: { question: userMsg }
                })
            });
            const data = await res.json();
            if (data.result) {
                setMessages(prev => [...prev, { role: 'assistant', text: data.result }]);
            }
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I couldn't answer that right now." }]);
        } finally {
            setIsChatLoading(false);
        }
    };

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Auto-generate summary on first summary tab open
    useEffect(() => {
        if (isOpen && activeTab === 'summary' && !summary && !isGeneratingSummary) {
            generateSummary();
        }
    }, [isOpen, activeTab]);

    // Selection state
    const [selection, setSelection] = useState<{ text: string, x: number, y: number } | null>(null);

    useEffect(() => {
        const handleSelection = () => {
            const sel = window.getSelection();
            if (sel && sel.toString().trim().length > 0) {
                const range = sel.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                setSelection({
                    text: sel.toString(),
                    x: rect.left + (rect.width / 2),
                    y: rect.top + window.scrollY - 10
                });
            } else {
                setSelection(null);
            }
        };

        document.addEventListener('mouseup', handleSelection);
        return () => document.removeEventListener('mouseup', handleSelection);
    }, []);

    const handleExplainSelection = () => {
        if (!selection) return;
        setIsOpen(true);
        setActiveTab('chat');
        const question = `Explain this text: "${selection.text}"`;
        setChatInput(question);
        // We can auto-send or let user send. Let's auto-send for magic feel.
        setTimeout(() => {
            // Need to expose a way to trigger send or just call internal function if moved out of component
            // For now, let's just set input. A better UX might be to auto-send.
            setMessages(prev => [...prev, { role: 'user', text: question }]);
            setIsChatLoading(true);
            fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'chat',
                    content: content,
                    context: { question }
                })
            }).then(res => res.json()).then(data => {
                setMessages(prev => [...prev, { role: 'assistant', text: data.result || "Could not explain." }]);
            }).finally(() => setIsChatLoading(false));
        }, 100);

        // Clear selection to hide tooltip
        setSelection(null);
        window.getSelection()?.removeAllRanges();
    };

    if (!isOpen) {
        return (
            <>
                <button className={styles.fab} onClick={toggleOpen} title="AI Reading Assistant">
                    <Sparkles size={24} />
                </button>
                {selection && (
                    <button
                        className={styles.selectionTooltip}
                        style={{ top: selection.y, left: selection.x }}
                        onClick={handleExplainSelection}
                    >
                        <Sparkles size={14} /> Explain
                    </button>
                )}
            </>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    <Sparkles size={18} className={styles.iconPulse} />
                    <span>Reading Assistant</span>
                </div>
                <button onClick={toggleOpen} className={styles.closeBtn}>
                    <X size={18} />
                </button>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'summary' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('summary')}
                >
                    <BookOpen size={16} /> Summary
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'chat' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('chat')}
                >
                    <MessageSquare size={16} /> Q&A Chat
                </button>
            </div>

            <div className={styles.contentArea}>
                {activeTab === 'summary' && (
                    <div className={styles.summaryContainer}>
                        {isGeneratingSummary ? (
                            <div className={styles.loading}>
                                <Sparkles className={styles.spin} size={24} />
                                <p>Reading article...</p>
                            </div>
                        ) : (
                            <div className={styles.summaryText}>
                                <h3>TL;DR</h3>
                                <p>{summary || "Could not generate summary."}</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'chat' && (
                    <div className={styles.chatContainer}>
                        <div className={styles.messages}>
                            {messages.length === 0 && (
                                <div className={styles.emptyState}>
                                    <p>Ask me anything about this article!</p>
                                    <div className={styles.suggestions}>
                                        <button onClick={() => { setChatInput("What is the main takeaway?"); }}>What's the main takeaway?</button>
                                        <button onClick={() => { setChatInput("Who is the target audience?"); }}>Who is this for?</button>
                                    </div>
                                </div>
                            )}
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.aiMsg}`}>
                                    <div className={styles.msgAvatar}>
                                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                    </div>
                                    <p>{msg.text}</p>
                                </div>
                            ))}
                            {isChatLoading && (
                                <div className={`${styles.message} ${styles.aiMsg}`}>
                                    <div className={styles.msgAvatar}><Bot size={14} /></div>
                                    <p>Thinking...</p>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>
                        <div className={styles.inputArea}>
                            <input
                                type="text"
                                placeholder="Ask a question..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                            />
                            <button onClick={handleSendChat} disabled={!chatInput.trim() || isChatLoading}>
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
