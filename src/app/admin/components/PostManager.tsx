import React, { useState } from 'react';
import {
    Edit,
    Trash2,
    Eye,
    Star,
    MoreVertical,
    FileText,
    Search,
    Filter
} from 'lucide-react';
import { MOCK_BLOGS, CATEGORIES } from '@/data/mockData';
import styles from '../page.module.css';
import Dropdown from '@/components/Dropdown';

export default function PostManager({ initialStatus = 'All' }: { initialStatus?: string }) {
    // Local state to simulate deletions/changes for now
    const [posts, setPosts] = useState(MOCK_BLOGS);
    const [featuredId, setFeaturedId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState(initialStatus);

    const handleDelete = (slug: string) => {
        if (confirm('Are you sure you want to delete this post?')) {
            setPosts(posts.filter(p => p.slug !== slug));
        }
    };

    const handleToggleFeatured = (slug: string) => {
        setFeaturedId(featuredId === slug ? null : slug);
    };

    // Filter Logic
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

        // Mock Status Logic
        const status = 'Published'; // Default to Published for existing mock items

        const matchesStatus = selectedStatus === 'All' || (post as any).status === selectedStatus || status === selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    // Initialize some mock drafts for demonstration
    React.useEffect(() => {
        setPosts(prev => prev.map((p, i) => ({
            ...p,
            status: i % 4 === 0 ? 'Draft' : 'Published' // Make every 4th post a draft
        })));
    }, []);

    const categoryOptions = [
        { value: 'All', label: 'All Categories' },
        ...CATEGORIES.map(cat => ({ value: cat.name, label: cat.name }))
    ];

    const statusOptions = [
        { value: 'All', label: 'All Status' },
        { value: 'Published', label: 'Published' },
        { value: 'Draft', label: 'Draft' },
        { value: 'Archived', label: 'Archived' }
    ];

    return (
        <div className={styles.managerContainer}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionBar}></div>
                <h2>Manage Posts ({filteredPosts.length})</h2>
                {selectedStatus !== 'All' && (
                    <span className={styles.categoryTag} style={{ marginLeft: '1rem', background: 'var(--primary)', color: 'white' }}>
                        Filtered by: {selectedStatus}
                    </span>
                )}
            </div>

            {/* Filer & Search Controls */}
            <div className={styles.filterControls}>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className={styles.filterInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div style={{ width: '200px' }}>
                    <Dropdown
                        options={categoryOptions}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        searchable={true}
                        placeholder="Select Category"
                    />
                </div>

                <div style={{ width: '180px' }}>
                    <Dropdown
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        searchable={false}
                        placeholder="Select Status"
                    />
                </div>
            </div>

            <div className={styles.tableCard}>
                <table className={styles.dataTable}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.map((post: any) => (
                            <tr key={post.slug} className={featuredId === post.slug ? styles.highlightRow : ''}>
                                <td className={styles.titleCell}>
                                    <div className={styles.titleContent}>
                                        <span className={styles.postTitle}>{post.title}</span>
                                        <span className={styles.postExcerpt}>{post.excerpt.substring(0, 50)}...</span>
                                    </div>
                                    {featuredId === post.slug && <span className={styles.featuredBadge}>Featured</span>}
                                </td>
                                <td>
                                    <span className={styles.categoryTag}>{post.category}</span>
                                </td>
                                <td className={styles.dateCell}>{post.date}</td>
                                <td>
                                    <span className={`${styles.statusBadge} ${post.status === 'Draft' ? styles.draftBadge : styles.publishedBadge}`}>
                                        {post.status || 'Published'}
                                    </span>
                                </td>
                                <td>
                                    <div className={styles.actionButtons}>
                                        <button
                                            onClick={() => handleToggleFeatured(post.slug)}
                                            className={`${styles.iconBtn} ${featuredId === post.slug ? styles.activeStar : ''}`}
                                            title="Toggle Featured"
                                        >
                                            <Star size={18} />
                                        </button>
                                        <button className={styles.iconBtn} title="View">
                                            <Eye size={18} />
                                        </button>
                                        <button className={styles.iconBtn} title="Edit">
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.slug)}
                                            className={`${styles.iconBtn} ${styles.deleteBtn}`}
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredPosts.length === 0 && (
                    <div className={styles.emptyState}>
                        <FileText size={48} color="#e5e7eb" />
                        <p>No posts found matching your criteria.</p>
                        <button
                            className="btn btn-secondary"
                            style={{ marginTop: '0.5rem' }}
                            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedStatus('All'); }}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
