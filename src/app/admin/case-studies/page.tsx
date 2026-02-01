'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, Button, Switch, Input } from '@/components/ui'
import {
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    RefreshCw,
    Link as LinkIcon,
    Image as ImageIcon,
    Loader2,
    AlertTriangle,
    Check
} from 'lucide-react'

// Mock data
const mockCaseStudies = [
    {
        id: 'cs1',
        title: 'FinTech Dashboard - Full Case Study',
        projectTitle: 'FinTech Dashboard',
        projectId: '1',
        driveFileId: 'abc123xyz',
        thumbnailUrl: null,
        totalPages: 12,
        renderStatus: 'completed',
        isPublic: true,
        watermarkEnabled: true,
    },
    {
        id: 'cs2',
        title: 'AI Writing Assistant - Strategy Deck',
        projectTitle: 'AI Writing Assistant',
        projectId: '3',
        driveFileId: 'def456uvw',
        thumbnailUrl: null,
        totalPages: 8,
        renderStatus: 'completed',
        isPublic: true,
        watermarkEnabled: false,
    },
    {
        id: 'cs3',
        title: 'Social Commerce - Launch Plan',
        projectTitle: 'Social Commerce',
        projectId: '6',
        driveFileId: 'ghi789rst',
        thumbnailUrl: null,
        totalPages: 0,
        renderStatus: 'pending',
        isPublic: false,
        watermarkEnabled: true,
    },
]

export default function CaseStudiesListPage() {
    const [caseStudies, setCaseStudies] = useState(mockCaseStudies)
    const [search, setSearch] = useState('')
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const [renderingId, setRenderingId] = useState<string | null>(null)

    const filteredCaseStudies = caseStudies.filter(cs =>
        cs.title.toLowerCase().includes(search.toLowerCase()) ||
        cs.projectTitle.toLowerCase().includes(search.toLowerCase())
    )

    const togglePublish = (id: string) => {
        setCaseStudies(prev => prev.map(cs =>
            cs.id === id ? { ...cs, isPublic: !cs.isPublic } : cs
        ))
    }

    const triggerRender = async (id: string) => {
        setRenderingId(id)
        // Simulate render API call
        await new Promise(resolve => setTimeout(resolve, 3000))
        setCaseStudies(prev => prev.map(cs =>
            cs.id === id ? { ...cs, renderStatus: 'completed', totalPages: 10 } : cs
        ))
        setRenderingId(null)
    }

    const deleteCaseStudy = (id: string) => {
        if (confirm('Are you sure you want to delete this case study?')) {
            setCaseStudies(prev => prev.filter(cs => cs.id !== id))
        }
    }

    const getStatusBadge = (status: string, id: string) => {
        if (renderingId === id) {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-sm">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Rendering
                </span>
            )
        }

        switch (status) {
            case 'completed':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
                        <Check className="w-3 h-3" />
                        Ready
                    </span>
                )
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-sm">
                        <AlertTriangle className="w-3 h-3" />
                        Pending
                    </span>
                )
            case 'failed':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm">
                        <AlertTriangle className="w-3 h-3" />
                        Failed
                    </span>
                )
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">Case Studies</h1>
                    <p className="text-foreground-muted">Manage your PDF case studies from Google Drive</p>
                </div>
                <Link
                    href="/admin/case-studies/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-semibold rounded-lg hover:shadow-glow transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add Case Study
                </Link>
            </div>

            {/* Info card */}
            <Card hover={false} className="p-4 bg-accent/5 border-accent/20">
                <div className="flex items-start gap-3">
                    <LinkIcon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-foreground font-medium">How it works</p>
                        <p className="text-sm text-foreground-muted">
                            Paste a Google Drive file ID or link. The system will download the PDF,
                            render pages as images, and upload them to Cloudinary for secure viewing.
                        </p>
                    </div>
                </div>
            </Card>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-subtle" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search case studies..."
                    className="w-full pl-12 pr-4 py-3 bg-background-secondary border border-border rounded-lg text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-all"
                />
            </div>

            {/* Case Studies Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCaseStudies.map((cs, index) => (
                    <motion.div
                        key={cs.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card hover={false} className="overflow-hidden">
                            {/* Thumbnail */}
                            <div className="h-40 bg-background-tertiary flex items-center justify-center relative">
                                {cs.thumbnailUrl ? (
                                    <img src={cs.thumbnailUrl} alt={cs.title} className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon className="w-12 h-12 text-foreground-subtle" />
                                )}

                                {/* Status badge overlay */}
                                <div className="absolute top-3 right-3">
                                    {getStatusBadge(cs.renderStatus, cs.id)}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <p className="text-sm text-accent mb-1">{cs.projectTitle}</p>
                                <h3 className="font-medium text-foreground mb-2 line-clamp-1">{cs.title}</h3>

                                <div className="flex items-center gap-4 text-sm text-foreground-muted mb-4">
                                    <span>{cs.totalPages} pages</span>
                                    <span>•</span>
                                    <span className="truncate">ID: {cs.driveFileId.slice(0, 8)}...</span>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            checked={cs.isPublic}
                                            onChange={() => togglePublish(cs.id)}
                                            label={cs.isPublic ? 'Public' : 'Private'}
                                        />
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => triggerRender(cs.id)}
                                            disabled={renderingId === cs.id}
                                            className="p-2 rounded-lg text-foreground-muted hover:bg-background-tertiary hover:text-foreground transition-colors disabled:opacity-50"
                                            title="Re-render pages"
                                        >
                                            <RefreshCw className={`w-4 h-4 ${renderingId === cs.id ? 'animate-spin' : ''}`} />
                                        </button>
                                        <Link
                                            href={`/view/${cs.id}`}
                                            target="_blank"
                                            className="p-2 rounded-lg text-foreground-muted hover:bg-background-tertiary hover:text-foreground transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => deleteCaseStudy(cs.id)}
                                            className="p-2 rounded-lg text-foreground-muted hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {filteredCaseStudies.length === 0 && (
                <Card hover={false} className="p-8 text-center">
                    <p className="text-foreground-muted">No case studies found</p>
                </Card>
            )}
        </div>
    )
}
