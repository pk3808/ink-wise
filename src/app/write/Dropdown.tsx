"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';
import { ChevronDown, Search, Check } from 'lucide-react';

interface DropdownProps {
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function Dropdown({
    options,
    value,
    onChange,
    placeholder = "Select..."
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.dropdownContainer} ref={containerRef}>
            <button
                className={`${styles.dropdownTrigger} ${isOpen ? styles.open : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedOption ? selectedOption.label : placeholder}</span>
                <ChevronDown size={16} className={styles.dropdownArrow} />
            </button>

            {isOpen && (
                <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownSearch}>
                        <Search size={14} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.dropdownSearchInput}
                            autoFocus
                        />
                    </div>
                    <div className={styles.dropdownList}>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(option => (
                                <div
                                    key={option.value}
                                    className={`${styles.dropdownItem} ${option.value === value ? styles.selected : ''}`}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                        setSearchQuery('');
                                    }}
                                >
                                    {option.label}
                                    {option.value === value && <Check size={14} />}
                                </div>
                            ))
                        ) : (
                            <div className={styles.dropdownEmpty}>No results found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
