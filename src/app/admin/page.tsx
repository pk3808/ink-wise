"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    Eye,
    BarChart3,
    PlusCircle,
    Tag,
    LogOut
} from 'lucide-react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [postFilter, setPostFilter] = useState('All'); // New state for filter
    const [loading, setLoading] = useState(true);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('pensieri-admin-auth');
        if (!isAuthenticated) {
            router.push('/admin/login');
        } else {
            setLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('pensieri-admin-auth');
        router.push('/admin/login');
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        // Reset filter when switching tabs unless specifically handling a flow
        if (tab !== 'posts') {
            setPostFilter('All');
        } else {
            // If switching to posts manually, reset filter to All (Review Now handles its own set)
            // But wait, if we are already in posts and click posts again, we might want to reset.
            // If we come from Review Now, handleTabChange isn't called directly, logic below handles it.
        }
        // Actually, let's keep it simple: manual clicks reset default functionality
        if (tab === 'posts') {
            setPostFilter('All');
        }
    };

    const handleReviewNow = () => {
        setPostFilter('Draft');
        setActiveTab('posts');
    };

    // Close mobile sidebar when changing tabs
    useEffect(() => {
        setIsMobileSidebarOpen(false);
    }, [activeTab]);

    if (loading) {
        return (
            <BrandedLoader text="Initializing Dashboard..." />
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar fullWidth isAdmin />
            <main className={styles.main} style={{ height: 'calc(100vh - 60px)', minHeight: 'unset' }}>

                {/* Mobile Menu Toggle (Visible only on mobile via CSS) */}
                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setIsMobileSidebarOpen(true)}
                >
                    <LayoutDashboard size={20} />
                    <span>Menu</span>
                </button>

                {/* Mobile Overlay */}
                {isMobileSidebarOpen && (
                    <div
                        className={styles.mobileOverlay}
                        onClick={() => setIsMobileSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside className={`
                    ${styles.sidebar} 
                    ${isSidebarCollapsed ? styles.collapsed : ''} 
                    ${isMobileSidebarOpen ? styles.mobileOpen : ''}
                `}>
                    <div className={styles.sidebarHeader}>
                        <h2 className={styles.brandTitle}>
                            {isSidebarCollapsed ? 'PE' : 'Pensieri Portal'}
                        </h2>
                        {/* Desktop Collapse Button */}
                        <button
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className={styles.collapseBtn}
                        >
                            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </button>
                        {/* Mobile Close Button */}
                        <button
                            onClick={() => setIsMobileSidebarOpen(false)}
                            className={styles.pastedMobileCloseBtn}
                        >
                            <ChevronLeft size={20} />
                        </button>
                    </div>

                    <nav className={styles.sideNav}>
                        <button
                            onClick={() => handleTabChange('overview')}
                            className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
                        >
                            <LayoutDashboard size={20} />
                            {!isSidebarCollapsed && <span>Dashboard</span>}
                        </button>
                        <button
                            onClick={() => handleTabChange('posts')}
                            className={`${styles.navItem} ${activeTab === 'posts' ? styles.active : ''}`}
                        >
                            <FileText size={20} />
                            {!isSidebarCollapsed && <span>All Posts</span>}
                        </button>
                        <button
                            onClick={() => handleTabChange('categories')}
                            className={`${styles.navItem} ${activeTab === 'categories' ? styles.active : ''}`}
                        >
                            <Tag size={20} />
                            {!isSidebarCollapsed && <span>Categories</span>}
                        </button>
                        <button
                            onClick={() => handleTabChange('comments')}
                            className={`${styles.navItem} ${activeTab === 'comments' ? styles.active : ''}`}
                        >
                            <MessageSquare size={20} />
                            {!isSidebarCollapsed && <span>Comments</span>}
                        </button>
                        <button
                            onClick={() => handleTabChange('settings')}
                            className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
                        >
                            <Settings size={20} />
                            {!isSidebarCollapsed && <span>Settings</span>}
                        </button>
                    </nav>

                    <div className={styles.sidebarFooter}>
                        <div className={styles.userProfile}>
                            <div className={styles.avatar}>A</div>
                            {!isSidebarCollapsed && (
                                <div className={styles.userInfo}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <p className={styles.userName}>Admin User</p>
                                        <button onClick={handleLogout} title="Logout" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}>
                                            <LogOut size={14} />
                                        </button>
                                    </div>
                                    <p className={styles.userRole}>Editor in Chief</p>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <section className={styles.content}>

                    {/* Top Header */}
                    <header className={styles.header}>
                        <h1 className={styles.pageTitle}>
                            {activeTab === 'overview' && 'Blog Management'}
                            {activeTab === 'posts' && 'Post Manager'}
                            {activeTab === 'categories' && 'Categories'}
                            {activeTab === 'settings' && 'Settings'}
                        </h1>
                        <div className={styles.headerActions}>
                            <div className={styles.headerUser}>
                                <div className={styles.headerAvatar}>A</div>
                                <div className={styles.headerUserInfo}>
                                    <span className={styles.headerUserName}>Admin User</span>
                                    <span className={styles.headerUserRole}>Super Admin</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Content Area */}
                    <div className={styles.scrollableContent}>
                        {activeTab === 'overview' && <DashboardOverview onRequestReview={handleReviewNow} />}
                        {activeTab === 'posts' && <PostManager key={postFilter} initialStatus={postFilter} />}

                        {/* Placeholders for other tabs */}
                        {activeTab === 'categories' && (
                            <div className={styles.emptyState}>
                                <Tag size={48} color="#e5e7eb" />
                                <p>Category management coming soon.</p>
                            </div>
                        )}
                        {activeTab === 'settings' && (
                            <div className={styles.emptyState}>
                                <Settings size={48} color="#e5e7eb" />
                                <p>Settings coming soon.</p>
                            </div>
                        )}
                    </div>

                </section>
            </main>
        </div>
    );
}

// Sub-components
import DashboardOverview from './components/DashboardOverview';
import PostManager from './components/PostManager';
import Dropdown from '@/components/Dropdown'; // Just to be sure imports are clean
import BrandedLoader from '@/components/BrandedLoader';
