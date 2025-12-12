"use client";

import React from 'react';
import styles from './BrandedLoader.module.css';

const WRITING_QUOTES = [
    "“Writing is painting to voice.”",
    "“The pen is the tongue of the mind.”",
    "“Poetry is truth in its Sunday clothes.”",
    "“Start writing, no matter what. The water does not flow until the faucet is turned on.”",
    "“There is no greater agony than bearing an untold story inside you.”",
    "“Fill your paper with the breathings of your heart.”",
    "“Words are our most inexhaustible source of magic.”"
];

interface BrandedLoaderProps {
    text?: string;
    fullScreen?: boolean;
    showQuotes?: boolean;
}

export default function BrandedLoader({ text = "Loading Experience...", fullScreen = true, showQuotes = false }: BrandedLoaderProps) {
    const [quote, setQuote] = React.useState(text);

    React.useEffect(() => {
        if (showQuotes) {
            const randomQuote = WRITING_QUOTES[Math.floor(Math.random() * WRITING_QUOTES.length)];
            setQuote(randomQuote);
        }
    }, [showQuotes]);

    return (
        <div className={styles.loaderContainer} style={!fullScreen ? { height: '100%', minHeight: '300px' } : {}}>
            <div className={styles.logoWrapper}>
                <div className={styles.ripple}></div>
                <div className={styles.ripple}></div>
                <img src="/inkwise.png" alt="Logo" className={styles.logoImage} />
            </div>

            <span className={styles.loadingText} style={showQuotes ? { textTransform: 'none', fontStyle: 'italic', maxWidth: '600px', textAlign: 'center', lineHeight: '1.5' } : {}}>
                {quote}
            </span>

            <div className={styles.progressBar}>
                <div className={styles.progressFill}></div>
            </div>
        </div>
    );
}
