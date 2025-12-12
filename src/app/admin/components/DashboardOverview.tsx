import React from 'react';
import { useRouter } from "next/navigation";
import {
    FileText,
    Users,
    Settings,
    MessageSquare,
    AlertCircle,
    Eye,
    BarChart3,
    PlusCircle,
    Tag
} from 'lucide-react';
// We'll accept the styles object as a prop to avoid duplicate CSS files for now, 
// or we could import it if it was in a shared location. 
// For simplicity in this refactor, let's assume the parent passes the styles 
// or we import the module if Next.js allows accessing parent module.
// Actually, better to just import the module directly if possible, 
// but it's in the parent folder. Let's try relative import.
import styles from '../page.module.css';

export default function DashboardOverview({ onRequestReview }: { onRequestReview: () => void }) {
    const router = useRouter();

    return (
        <>
            {/* Banner */}
            <div className={styles.banner}>
                <div className={styles.bannerIcon}>
                    <AlertCircle size={24} />
                </div>
                <div className={styles.bannerContent}>
                    <h3>Pending Review: 3 Drafts</h3>
                    <p>There are 3 new posts awaiting your approval before publishing.</p>
                </div>
                <button className={styles.bannerBtn} onClick={onRequestReview}>Review Now</button>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIconWrapper} style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                        <FileText size={24} />
                    </div>
                    <div className={styles.statInfo}>
                        <h3>1,240</h3>
                        <p>Total Posts</p>
                        <span className={styles.statTrend}>+12 this week</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconWrapper} style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
                        <Eye size={24} />
                    </div>
                    <div className={styles.statInfo}>
                        <h3>85.2k</h3>
                        <p>Total Views</p>
                        <span className={styles.statTrend}>+5.4% vs last month</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconWrapper} style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
                        <MessageSquare size={24} />
                    </div>
                    <div className={styles.statInfo}>
                        <h3>342</h3>
                        <p>Comments</p>
                        <span className={styles.statSub}>12 pending moderation</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconWrapper} style={{ backgroundColor: '#fff1f2', color: '#e11d48' }}>
                        <Users size={24} />
                    </div>
                    <div className={styles.statInfo}>
                        <h3>8,500</h3>
                        <p>Subscribers</p>
                        <span className={styles.statTrend}>+120 this week</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.sectionHeader}>
                <div className={styles.sectionBar}></div>
                <h2>Quick Actions</h2>
            </div>

            <div className={styles.actionsGrid}>
                <button className={styles.actionCard} onClick={() => router.push('/write')}>
                    <div className={styles.actionIcon}>
                        <PlusCircle size={28} />
                    </div>
                    <h3>Create Post</h3>
                    <p>Write new article</p>
                </button>
                <button className={styles.actionCard}>
                    <div className={styles.actionIcon}>
                        <Tag size={28} />
                    </div>
                    <h3>Categories</h3>
                    <p>Manage topics</p>
                </button>
                <button className={styles.actionCard}>
                    <div className={styles.actionIcon}>
                        <Users size={28} />
                    </div>
                    <h3>Manage Team</h3>
                    <p>Editors & Writers</p>
                </button>
                <button className={styles.actionCard}>
                    <div className={styles.actionIcon}>
                        <BarChart3 size={28} />
                    </div>
                    <h3>Analytics</h3>
                    <p>View report</p>
                </button>
                <button className={styles.actionCard}>
                    <div className={styles.actionIcon}>
                        <Settings size={28} />
                    </div>
                    <h3>Settings</h3>
                    <p>Site configuration</p>
                </button>
            </div>
        </>
    );
}
