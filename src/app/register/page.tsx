"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { ArrowLeft, Chrome } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        setLoading(true);
        // Mock register
        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <main className={styles.container}>
            <Link href="/" className={styles.backButton} aria-label="Back to Home">
                <ArrowLeft size={24} />
            </Link>

            <div className={styles.splitCard}>

                {/* LEFT SIDE: Brand */}
                <div className={styles.brandSection}>
                    <Link href="/" className={styles.logo}>
                        <img src="/inkwise.png" alt="Pensieri Logo" className={styles.logoImage} />
                        Pensieri<span className={styles.dot}>.</span>
                    </Link>
                    <h1 className={styles.brandTitle}>Join the Club.</h1>
                    <p className={styles.brandSubtitle}>
                        Create an account to become a part of our growing community of writers, thinkers, and creators.
                    </p>
                </div>

                {/* RIGHT SIDE: Form */}
                <div className={styles.formSection}>
                    <div className={styles.formHeader}>
                        <h2 className={styles.formTitle}>Create Account</h2>
                        <p className={styles.formSubtitle}>Enter your details to get started.</p>
                    </div>

                    <form onSubmit={handleRegister} className={styles.form}>
                        <button type="button" className={styles.googleBtn}>
                            <Chrome size={20} />
                            Sign up with Google
                        </button>

                        <div className={styles.divider}>or with email</div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="name" className={styles.label}>Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={styles.input}
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.label}>Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="password" className={styles.label}>Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles.input}
                                    placeholder="•••••"
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="confirmPassword" className={styles.label}>Confirm</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={styles.input}
                                    placeholder="•••••"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        Already have an account?
                        <Link href="/login" className={styles.link}>Sign In</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
