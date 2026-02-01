'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui'
import {
    FolderKanban,
    FileText,
    Eye,
    TrendingUp,
    Plus,
    ArrowRight
} from 'lucide-react'

// Mock stats - will be fetched from API
const stats = [
    { label: 'Projects', value: 6, icon: FolderKanban, href: '/admin/projects', color: 'text-blue-400' },
    { label: 'Case Studies', value: 3, icon: FileText, href: '/admin/case-studies', color: 'text-purple-400' },
    { label: 'Total Views', value: 1248, icon: Eye, href: '#', color: 'text-green-400' },
    { label: 'This Month', value: '+23%', icon: TrendingUp, href: '#', color: 'text-accent' },
]

const recentActivity = [
    { action: 'Published', item: 'FinTech Dashboard', time: '2 hours ago' },
    { action: 'Updated', item: 'E-Commerce Platform', time: '5 hours ago' },
    { action: 'Added case study to', item: 'AI Writing Assistant', time: '1 day ago' },
    { action: 'Created', item: 'Healthcare App', time: '3 days ago' },
]

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
                    <p className="text-foreground-muted">Welcome back! Here&apos;s an overview of your portfolio.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-semibold rounded-lg hover:shadow-glow transition-all"
                >
                    <Plus className="w-5 h-5" />
                    New Project
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                        <Link href={stat.href}>
                            <Card hover={false} className="p-6 hover:border-accent/30 transition-colors">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-background-tertiary flex items-center justify-center ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                                <p className="text-sm text-foreground-muted">{stat.label}</p>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                >
                    <Card hover={false} className="p-6">
                        <h2 className="text-xl font-display font-bold text-foreground mb-6">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link
                                href="/admin/projects/new"
                                className="flex items-center justify-between p-4 rounded-lg bg-background-tertiary hover:bg-accent/10 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <FolderKanban className="w-5 h-5 text-foreground-muted" />
                                    <span className="text-foreground">Create New Project</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-foreground-subtle group-hover:text-accent transition-colors" />
                            </Link>
                            <Link
                                href="/admin/case-studies/new"
                                className="flex items-center justify-between p-4 rounded-lg bg-background-tertiary hover:bg-accent/10 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-foreground-muted" />
                                    <span className="text-foreground">Add Case Study</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-foreground-subtle group-hover:text-accent transition-colors" />
                            </Link>
                            <Link
                                href="/"
                                target="_blank"
                                className="flex items-center justify-between p-4 rounded-lg bg-background-tertiary hover:bg-accent/10 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <Eye className="w-5 h-5 text-foreground-muted" />
                                    <span className="text-foreground">View Live Site</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-foreground-subtle group-hover:text-accent transition-colors" />
                            </Link>
                        </div>
                    </Card>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                >
                    <Card hover={false} className="p-6">
                        <h2 className="text-xl font-display font-bold text-foreground mb-6">Recent Activity</h2>
                        <div className="space-y-4">
                            {recentActivity.map((activity, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-background-tertiary transition-colors"
                                >
                                    <div className="w-2 h-2 rounded-full bg-accent" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-foreground">
                                            <span className="text-foreground-muted">{activity.action}</span>{' '}
                                            <span className="font-medium">{activity.item}</span>
                                        </p>
                                        <p className="text-sm text-foreground-subtle">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
