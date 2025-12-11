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
    const [loading, setLoading] = useState(true);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('inkwise-admin-auth');
        if (!isAuthenticated) {
            router.push('/admin/login');
        } else {
            setLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('inkwise-admin-auth');
        router.push('/admin/login');
    };

    if (loading) {
        return (
            <main className={styles.main}>
                <div className={styles.loadingContainer}>
                    Loading Dashboard...
                </div>
            </main>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar fullWidth />
            <main className={styles.main} style={{ height: 'calc(100vh - 60px)', minHeight: 'unset' }}>
                {/* Sidebar */}
                <aside className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ''}`}>
                    <div className={styles.sidebarHeader}>
                        <h2 className={styles.brandTitle}>
                            {isSidebarCollapsed ? 'IW' : 'InkWise Portal'}
                        </h2>
                        <button
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className={styles.collapseBtn}
                        >
                            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </button>
                    </div>

                    <nav className={styles.sideNav}>
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
                        >
                            <LayoutDashboard size={20} />
                            {!isSidebarCollapsed && <span>Dashboard</span>}
                        </button>
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`${styles.navItem} ${activeTab === 'posts' ? styles.active : ''}`}
                        >
                            <FileText size={20} />
                            {!isSidebarCollapsed && <span>All Posts</span>}
                        </button>
                        <button
                            onClick={() => setActiveTab('categories')}
                            className={`${styles.navItem} ${activeTab === 'categories' ? styles.active : ''}`}
                        >
                            <Tag size={20} />
                            {!isSidebarCollapsed && <span>Categories</span>}
                        </button>
                        <button
                            onClick={() => setActiveTab('comments')}
                            className={`${styles.navItem} ${activeTab === 'comments' ? styles.active : ''}`}
                        >
                            <MessageSquare size={20} />
                            {!isSidebarCollapsed && <span>Comments</span>}
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
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
                        <h1 className={styles.pageTitle}>Blog Management</h1>
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

                    {/* Banner */}
                    <div className={styles.banner}>
                        <div className={styles.bannerIcon}>
                            <AlertCircle size={24} color="#d97706" />
                        </div>
                        <div className={styles.bannerContent}>
                            <h3>Pending Review: 3 Drafts</h3>
                            <p>There are 3 new posts awaiting your approval before publishing.</p>
                        </div>
                        <button className={styles.bannerBtn}>Review Now</button>
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

                </section>
            </main>
        </div>
    );
}

