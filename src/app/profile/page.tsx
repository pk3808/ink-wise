"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import {
    Edit2,
    BookOpen,
    Clock,
    Heart,
    Camera,
    Save,
    X,
    LayoutDashboard,
    BarChart3,
    Settings,
    TrendingUp,
    Zap,
    Droplet,
    Trophy,
    Target,
    Crown,
    MapPin,
    Calendar,
    Share2,
    Instagram,
    Facebook,
    Linkedin,
    Twitter,
    Lock,
    Eye,
    EyeOff,
    Shield
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FollowersModal from '@/components/FollowersModal';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie
} from 'recharts';

// Mock Data for Analytics
const READING_DATA = [
    { day: 'Mon', minutes: 45, interactive: 12 },
    { day: 'Tue', minutes: 30, interactive: 15 },
    { day: 'Wed', minutes: 65, interactive: 25 },
    { day: 'Thu', minutes: 40, interactive: 18 },
    { day: 'Fri', minutes: 85, interactive: 30 },
    { day: 'Sat', minutes: 120, interactive: 45 },
    { day: 'Sun', minutes: 95, interactive: 35 },
];

const TOPIC_DATA = [
    { name: 'Technology', value: 40, color: '#34C759' },
    { name: 'Design', value: 30, color: '#A28CFE' },
    { name: 'Culture', value: 20, color: '#FF9500' },
    { name: 'Business', value: 10, color: '#FF3B30' },
];

const MOCK_USERS = [
    { id: '1', name: 'Alex Rivera', handle: '@arivera', avatar: 'https://i.pravatar.cc/150?u=1', isFollowing: true },
    { id: '2', name: 'Sarah Chen', handle: '@schen_art', avatar: 'https://i.pravatar.cc/150?u=2', isFollowing: false },
    { id: '3', name: 'Marcus Thorne', handle: '@mthorne_dev', avatar: 'https://i.pravatar.cc/150?u=3', isFollowing: true },
    { id: '4', name: 'Elena Gilbert', handle: '@egilbert', avatar: 'https://i.pravatar.cc/150?u=4', isFollowing: false },
    { id: '5', name: 'Julian Voss', handle: '@jvoss', avatar: 'https://i.pravatar.cc/150?u=5', isFollowing: true },
];

export default function ProfilePage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'settings'>('overview');
    const [editForm, setEditForm] = useState({
        name: '',
        bio: '',
        avatar: '',
        location: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        facebook: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'followers' | 'following'>('followers');

    // Password Update State
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    // Individual toggle states
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!loggedIn) {
            router.push('/login');
            return;
        }

        const userData = localStorage.getItem('currentUser');
        if (userData) {
            const parsed = JSON.parse(userData);
            setUser(parsed);
            setEditForm({
                name: parsed.name || '',
                bio: parsed.bio || '',
                avatar: parsed.avatar || '',
                location: parsed.location || '',
                instagram: parsed.instagram || '',
                twitter: parsed.twitter || '',
                linkedin: parsed.linkedin || '',
                facebook: parsed.facebook || ''
            });
        }
        setIsLoading(false);
    }, [router]);

    const handleSave = () => {
        const updatedUser = { ...user, ...editForm };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setActiveTab('overview');
    };

    const handlePasswordUpdate = () => {
        setPasswordMessage({ type: '', text: '' });

        if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'All fields are required' });
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        if (passwordForm.newPassword.length < 8) {
            setPasswordMessage({ type: 'error', text: 'Password must be at least 8 characters' });
            return;
        }

        // Mock API call simulation
        setPasswordMessage({ type: 'success', text: 'Password updated successfully!' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });

        // Clear success message after 3 seconds
        setTimeout(() => {
            setPasswordMessage({ type: '', text: '' });
        }, 3000);
    };

    const handleImageTrigger = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setEditForm(prev => ({ ...prev, avatar: base64String }));
                // Proactively update user state for immediate feedback
                setUser((prev: any) => ({ ...prev, avatar: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    if (isLoading || !user) return null;

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                {/* New Split Layout */}
                <div className={styles.layoutGrid}>
                    {/* Left Sidebar - Sticky */}
                    <aside className={styles.profileSidebar}>
                        <div className={styles.avatarSection} onClick={handleImageTrigger}>
                            <div className={styles.avatarWrapper}>
                                <img src={user.avatar} alt={user.name} className={styles.avatar} />
                                <div className={styles.avatarOverlay}>
                                    <div className={styles.editAvatarIcon}>
                                        <Camera size={24} />
                                    </div>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className={styles.sidebarContent}>
                            <div className={styles.nameHeader}>
                                <h1 className={styles.name}>{user.name}</h1>
                                <div className={styles.premiumBadge}>
                                    <Crown size={14} fill="currentColor" />
                                    <span>Premium</span>
                                </div>
                            </div>
                            <p className={styles.email}>{user.email}</p>

                            <div className={styles.metadataColumn}>
                                <div className={styles.metaItem}>
                                    <MapPin size={16} />
                                    <span>{user.location || 'Location not set'}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <Calendar size={16} />
                                    <span>Joined March 2024</span>
                                </div>
                            </div>

                            <div className={styles.miniStatsRow}>
                                <div
                                    className={`${styles.miniStat} ${styles.clickableStat}`}
                                    onClick={() => { setModalType('followers'); setIsFollowersModalOpen(true); }}
                                >
                                    <span className={styles.miniStatValue}>12.4K</span>
                                    <span className={styles.miniStatLabel}>Followers</span>
                                </div>
                                <div className={styles.miniDivider} />
                                <div
                                    className={`${styles.miniStat} ${styles.clickableStat}`}
                                    onClick={() => { setModalType('following'); setIsFollowersModalOpen(true); }}
                                >
                                    <span className={styles.miniStatValue}>842</span>
                                    <span className={styles.miniStatLabel}>Following</span>
                                </div>
                                <div className={styles.miniDivider} />
                                <div className={styles.miniStat}>
                                    <span className={styles.miniStatValue}>
                                        <Droplet size={14} className={styles.inkScoreIcon} fill="currentColor" />
                                        98
                                    </span>
                                    <span className={styles.miniStatLabel}>Ink Score</span>
                                </div>
                            </div>

                            <p className={styles.bioText}>{user.bio || "No bio yet."}</p>

                            <div className={styles.sidebarActions}>
                                <div className={styles.socialRow}>
                                    <a
                                        href={user.instagram || '#'}
                                        target={user.instagram ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                        className={`${styles.socialIcon} ${!user.instagram ? styles.disabled : ''}`}
                                        onClick={(e) => !user.instagram && e.preventDefault()}
                                    >
                                        <Instagram size={18} />
                                    </a>
                                    <a
                                        href={user.twitter || '#'}
                                        target={user.twitter ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                        className={`${styles.socialIcon} ${!user.twitter ? styles.disabled : ''}`}
                                        onClick={(e) => !user.twitter && e.preventDefault()}
                                    >
                                        <Twitter size={18} />
                                    </a>
                                    <a
                                        href={user.linkedin || '#'}
                                        target={user.linkedin ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                        className={`${styles.socialIcon} ${!user.linkedin ? styles.disabled : ''}`}
                                        onClick={(e) => !user.linkedin && e.preventDefault()}
                                    >
                                        <Linkedin size={18} />
                                    </a>
                                </div>
                                <button className={styles.shareBtn}>
                                    <Share2 size={16} />
                                    Share
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Right Content Area */}
                    <div className={styles.mainContent}>

                        {/* Tabs Navigation */}
                        <div className={styles.tabsNav}>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.active : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                <LayoutDashboard size={18} />
                                Overview
                            </button>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'analytics' ? styles.active : ''}`}
                                onClick={() => setActiveTab('analytics')}
                            >
                                <BarChart3 size={18} />
                                Analytics
                            </button>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'settings' ? styles.active : ''}`}
                                onClick={() => setActiveTab('settings')}
                            >
                                <Settings size={18} />
                                Settings
                            </button>
                        </div>

                        {/* Tab Content */}
                        <main className={styles.tabContent}>
                            {activeTab === 'overview' && (
                                <div className={styles.overviewGrid}>
                                    <div className={styles.statsGrid}>
                                        <div className={styles.statCard}>
                                            <div className={styles.statHeader}>
                                                <div className={styles.statIcon}><BookOpen size={20} /></div>
                                                <span className={styles.statLabel}>Total Reading</span>
                                            </div>
                                            <span className={styles.statValue}>42</span>
                                            <div className={`${styles.statTrend} ${styles.trendUp}`}>+12% from last week</div>
                                        </div>
                                        <div className={styles.statCard}>
                                            <div className={styles.statHeader}>
                                                <div className={styles.statIcon}><Zap size={20} /></div>
                                                <span className={styles.statLabel}>Daily Streak</span>
                                            </div>
                                            <span className={styles.statValue}>7 Days</span>
                                            <div className={`${styles.statTrend} ${styles.trendUp}`}>New Goal Achieved!</div>
                                        </div>
                                        <div className={styles.statCard}>
                                            <div className={styles.statHeader}>
                                                <div className={styles.statIcon}><Trophy size={20} /></div>
                                                <span className={styles.statLabel}>Achievements</span>
                                            </div>
                                            <span className={styles.statValue}>15</span>
                                            <div className={`${styles.statTrend} ${styles.trendUp}`}>Top 5% Reader</div>
                                        </div>
                                    </div>

                                    <div className={styles.chartCard}>
                                        <h3 className={styles.chartTitle}>Recent Activity</h3>
                                        <div className={styles.chartContainer}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={READING_DATA}>
                                                    <defs>
                                                        <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                                    <Tooltip
                                                        contentStyle={{
                                                            background: 'var(--bg-card)',
                                                            border: '1px solid var(--border)',
                                                            borderRadius: '12px',
                                                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                                                        }}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="minutes"
                                                        stroke="var(--primary)"
                                                        strokeWidth={3}
                                                        fillOpacity={1}
                                                        fill="url(#colorMin)"
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'analytics' && (
                                <div className={styles.analyticsTab}>
                                    <div className={styles.chartGrid}>
                                        <div className={styles.chartCard}>
                                            <h3 className={styles.chartTitle}>Reading Intensity (Min)</h3>
                                            <div className={styles.chartContainer}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={READING_DATA}>
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                                        <YAxis axisLine={false} tickLine={false} />
                                                        <Tooltip
                                                            cursor={{ fill: 'var(--bg-secondary)' }}
                                                            contentStyle={{
                                                                background: 'var(--bg-card)',
                                                                border: '1px solid var(--border)',
                                                                borderRadius: '12px'
                                                            }}
                                                        />
                                                        <Bar dataKey="minutes" fill="var(--primary)" radius={[6, 6, 0, 0]} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        <div className={styles.chartCard}>
                                            <h3 className={styles.chartTitle}>Interests</h3>
                                            <div className={styles.chartContainer}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={TOPIC_DATA}
                                                            innerRadius={60}
                                                            outerRadius={80}
                                                            paddingAngle={5}
                                                            dataKey="value"
                                                        >
                                                            {TOPIC_DATA.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                                {/* Legend Mock */}
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                                                    {TOPIC_DATA.map((t) => (
                                                        <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                                                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color }} />
                                                            <span>{t.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.card} style={{ marginTop: '1.5rem' }}>
                                        <h3 className={styles.chartTitle}>Weekly Comparison</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>You spent 25% more time reading this week compared to last month.</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div className={styles.settingsTab}>
                                    <div className={styles.card}>
                                        <div className={styles.settingsGrid}>
                                            <div>
                                                <h3 className={styles.chartTitle}>Account Settings</h3>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Update your profile details and preferences.</p>
                                            </div>
                                            <div className={styles.editForm}>
                                                <div className={styles.profilePhotoSection}>
                                                    <div className={styles.photoUploadWrapper} onClick={handleImageTrigger}>
                                                        <img src={editForm.avatar} alt="Avatar Preview" className={styles.settingsAvatarLarge} />
                                                        <div className={styles.photoOverlay}>
                                                            <Camera size={24} color="white" />
                                                            <span>Change</span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.photoInfo}>
                                                        <h4 className={styles.photoLabel}>Profile Photo</h4>
                                                        <p className={styles.photoHelp}>Recommended 400x400px.</p>
                                                        <button className={styles.textBtn} onClick={handleImageTrigger}>
                                                            Upload New
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className={styles.inputGroup}>
                                                    <label className={styles.label}>Full Name</label>
                                                    <input
                                                        type="text"
                                                        className={styles.input}
                                                        value={editForm.name}
                                                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className={styles.inputGroup}>
                                                    <label className={styles.label}>Bio</label>
                                                    <textarea
                                                        className={styles.textarea}
                                                        value={editForm.bio}
                                                        onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                                                    />
                                                </div>
                                                <div className={styles.inputGroup}>
                                                    <label className={styles.label}>Location</label>
                                                    <input
                                                        type="text"
                                                        className={styles.input}
                                                        placeholder="e.g. San Francisco, CA"
                                                        value={editForm.location}
                                                        onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                                                    />
                                                </div>
                                                <div className={styles.inputGroup}>
                                                    <label className={styles.label}>Social Profiles</label>
                                                    <div className={styles.socialInputsGrid}>
                                                        <div className={styles.socialInputWrapper}>
                                                            <Instagram size={18} />
                                                            <input
                                                                type="text"
                                                                placeholder="Instagram URL"
                                                                className={styles.socialInput}
                                                                value={editForm.instagram}
                                                                onChange={e => setEditForm({ ...editForm, instagram: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className={styles.socialInputWrapper}>
                                                            <Twitter size={18} />
                                                            <input
                                                                type="text"
                                                                placeholder="Twitter URL"
                                                                className={styles.socialInput}
                                                                value={editForm.twitter}
                                                                onChange={e => setEditForm({ ...editForm, twitter: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className={styles.socialInputWrapper}>
                                                            <Linkedin size={18} />
                                                            <input
                                                                type="text"
                                                                placeholder="LinkedIn URL"
                                                                className={styles.socialInput}
                                                                value={editForm.linkedin}
                                                                onChange={e => setEditForm({ ...editForm, linkedin: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className={styles.socialInputWrapper}>
                                                            <Facebook size={18} />
                                                            <input
                                                                type="text"
                                                                placeholder="Facebook URL"
                                                                className={styles.socialInput}
                                                                value={editForm.facebook}
                                                                onChange={e => setEditForm({ ...editForm, facebook: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.buttonGroup}>
                                                    <button className={styles.saveBtn} onClick={handleSave}>
                                                        <Save size={18} style={{ marginRight: '0.5rem' }} /> Save Changes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.card} style={{ marginTop: '2rem' }}>
                                        <div className={styles.settingsGrid}>
                                            <div>
                                                <div className={styles.statHeader} style={{ marginBottom: '0.5rem' }}>
                                                    <Shield size={20} className={styles.statIcon} />
                                                    <h3 className={styles.chartTitle} style={{ margin: 0 }}>Password & Security</h3>
                                                </div>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                    Manage your password and account security settings.
                                                </p>
                                            </div>

                                            <div className={styles.editForm}>
                                                <div className={styles.inputGroup}>
                                                    <label className={styles.label}>Current Password</label>
                                                    <div className={styles.passwordInputWrapper}>
                                                        <input
                                                            type={showCurrentPass ? "text" : "password"}
                                                            className={styles.input}
                                                            placeholder="Enter current password"
                                                            value={passwordForm.currentPassword}
                                                            onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                                        />
                                                        <button
                                                            type="button"
                                                            className={styles.toggleBtn}
                                                            onClick={() => setShowCurrentPass(!showCurrentPass)}
                                                        >
                                                            {showCurrentPass ? (
                                                                <img src="/book.png" alt="Hide" className={`${styles.iconAnimate} ${styles.iconImage}`} />
                                                            ) : (
                                                                <img src="/lock.png" alt="Show" className={`${styles.iconAnimate} ${styles.iconImage}`} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className={styles.inputGroup}>
                                                    <label className={styles.label}>New Password</label>
                                                    <div className={styles.passwordInputWrapper}>
                                                        <input
                                                            type={showNewPass ? "text" : "password"}
                                                            className={styles.input}
                                                            placeholder="Enter new password"
                                                            value={passwordForm.newPassword}
                                                            onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                                        />
                                                        <button
                                                            type="button"
                                                            className={styles.toggleBtn}
                                                            onClick={() => setShowNewPass(!showNewPass)}
                                                        >
                                                            {showNewPass ? (
                                                                <img src="/book.png" alt="Hide" className={`${styles.iconAnimate} ${styles.iconImage}`} />
                                                            ) : (
                                                                <img src="/lock.png" alt="Show" className={`${styles.iconAnimate} ${styles.iconImage}`} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className={styles.inputGroup}>
                                                    <label className={styles.label}>Confirm New Password</label>
                                                    <div className={styles.passwordInputWrapper}>
                                                        <input
                                                            type={showConfirmPass ? "text" : "password"}
                                                            className={styles.input}
                                                            placeholder="Confirm new password"
                                                            value={passwordForm.confirmPassword}
                                                            onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                                        />
                                                        <button
                                                            type="button"
                                                            className={styles.toggleBtn}
                                                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                                                        >
                                                            {showConfirmPass ? (
                                                                <img src="/book.png" alt="Hide" className={`${styles.iconAnimate} ${styles.iconImage}`} />
                                                            ) : (
                                                                <img src="/lock.png" alt="Show" className={`${styles.iconAnimate} ${styles.iconImage}`} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Removed old toggle switch */}

                                                {passwordMessage.text && (
                                                    <div
                                                        style={{
                                                            padding: '0.75rem',
                                                            borderRadius: '8px',
                                                            marginBottom: '1rem',
                                                            fontSize: '0.9rem',
                                                            backgroundColor: passwordMessage.type === 'error' ? 'rgba(255, 59, 48, 0.1)' : 'rgba(52, 199, 89, 0.1)',
                                                            color: passwordMessage.type === 'error' ? '#FF3B30' : '#34C759',
                                                            border: `1px solid ${passwordMessage.type === 'error' ? 'rgba(255, 59, 48, 0.2)' : 'rgba(52, 199, 89, 0.2)'}`
                                                        }}
                                                    >
                                                        {passwordMessage.text}
                                                    </div>
                                                )}

                                                <div className={styles.buttonGroup}>
                                                    <button className={styles.saveBtn} onClick={handlePasswordUpdate}>
                                                        Update Password
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </main>
                    </div> {/* End mainContent */}
                </div> {/* End layoutGrid */}
            </div> {/* End container */}
            <Footer />
            <FollowersModal
                isOpen={isFollowersModalOpen}
                onClose={() => setIsFollowersModalOpen(false)}
                type={modalType}
                data={MOCK_USERS}
            />
        </>
    );
}
