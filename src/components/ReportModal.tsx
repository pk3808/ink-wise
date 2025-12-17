"use client";

import React, { useState } from 'react';
import styles from './ReportModal.module.css';
import { X, Check } from 'lucide-react';

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'blog' | 'comment';
    id?: string | number;
}

const REASONS = [
    "Spam or misleading",
    "Harassment or hate speech",
    "Inappropriate content",
    "Violence or dangerous organizations",
    "Other"
];

export default function ReportModal({ isOpen, onClose, type, id }: ReportModalProps) {
    const [step, setStep] = useState<'reason' | 'details' | 'success'>('reason');
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [details, setDetails] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleReasonSelect = (reason: string) => {
        setSelectedReason(reason);
        // If "Other" is selected, go to details, otherwise we can optionally just submit or ask for details too.
        // For this flow, let's always ask for details to make it feel robust.
        setStep('details');
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setStep('success');
    };

    const handleClose = () => {
        // Reset state on close
        setStep('reason');
        setSelectedReason(null);
        setDetails("");
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>

                {step !== 'success' && (
                    <div className={styles.header}>
                        <h3 className={styles.title}>Report {type}</h3>
                        <button className={styles.closeBtn} onClick={handleClose}>
                            <X size={20} />
                        </button>
                    </div>
                )}

                {step === 'reason' && (
                    <div className={styles.content}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Why are you reporting this?
                        </p>
                        <div className={styles.reasonsList}>
                            {REASONS.map(reason => (
                                <button
                                    key={reason}
                                    className={styles.reasonBtn}
                                    onClick={() => handleReasonSelect(reason)}
                                >
                                    {reason}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'details' && (
                    <div className={styles.content}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            Reason: <strong>{selectedReason}</strong>
                        </p>
                        <textarea
                            className={styles.textarea}
                            placeholder="Please provide any additional details..."
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            autoFocus
                        />
                        <div className={styles.actions}>
                            <button className={styles.cancelBtn} onClick={() => setStep('reason')}>
                                Back
                            </button>
                            <button
                                className={styles.submitBtn}
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Report'}
                            </button>
                        </div>
                    </div>
                )}

                {step === 'success' && (
                    <div className={styles.success}>
                        <div className={styles.successIcon}>
                            <Check size={28} />
                        </div>
                        <h3>Thanks for letting us know</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            We've received your report and will review it shortly.
                        </p>
                        <button className={styles.submitBtn} onClick={handleClose} style={{ marginTop: '1rem', width: '100%' }}>
                            Done
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
