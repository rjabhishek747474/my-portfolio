'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, Button, Switch } from '@/components/ui'
import {
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    GripVertical,
    ExternalLink
} from 'lucide-react'

// Mock data - will be fetched from API
const mockProjects = [
    { id: '1', title: 'FinTech Dashboard', tagline: 'Analytics redesign', published: true, order: 1, caseStudies: 1 },
    { id: '2', title: 'E-Commerce Platform', tagline: 'Marketplace MVP', published: true, order: 2, caseStudies: 0 },
    { id: '3', title: 'AI Writing Assistant', tagline: 'AI productivity tool', published: true, order: 3, caseStudies: 1 },
    { id: '4', title: 'Healthcare App', tagline: 'Patient care workflows', published: false, order: 4, caseStudies: 0 },
    { id: '5', title: 'Developer Tools', tagline: 'CI/CD pipeline', published: false, order: 5, caseStudies: 0 },
    { id: '6', title: 'Social Commerce', tagline: 'Social shopping feature', published: true, order: 6, caseStudies: 1 },
]

export default function ProjectsListPage() {
    const [projects, setProjects] = useState(mockProjects)
    const [search, setSearch] = useState('')
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
    )

    const togglePublish = (id: string) => {
        setProjects(prev => prev.map(p =>
            p.id === id ? { ...p, published: !p.published } : p
        ))
    }

    const deleteProject = (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            setProjects(prev => prev.filter(p => p.id !== id))
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">Projects</h1>
                    <p className="text-foreground-muted">Manage your portfolio projects</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-semibold rounded-lg hover:shadow-glow transition-all"
                >
                    <Plus className="w-5 h-5" />
                    New Project
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-subtle" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full pl-12 pr-4 py-3 bg-background-secondary border border-border rounded-lg text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-all"
                />
            </div>

            {/* Projects List */}
            <Card hover={false} className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left p-4 text-sm font-medium text-foreground-muted w-12"></th>
                                <th className="text-left p-4 text-sm font-medium text-foreground-muted">Project</th>
                                <th className="text-left p-4 text-sm font-medium text-foreground-muted hidden md:table-cell">Case Studies</th>
                                <th className="text-left p-4 text-sm font-medium text-foreground-muted">Published</th>
                                <th className="text-right p-4 text-sm font-medium text-foreground-muted">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProjects.map((project, index) => (
                                <motion.tr
                                    key={project.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border-b border-border hover:bg-background-tertiary/50 transition-colors"
                                >
                                    <td className="p-4">
                                        <GripVertical className="w-5 h-5 text-foreground-subtle cursor-grab" />
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <p className="font-medium text-foreground">{project.title}</p>
                                            <p className="text-sm text-foreground-muted">{project.tagline}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <span className={`px-3 py-1 rounded-full text-sm ${project.caseStudies > 0
                                                ? 'bg-accent/10 text-accent'
                                                : 'bg-background-tertiary text-foreground-subtle'
                                            }`}>
                                            {project.caseStudies}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <Switch
                                            checked={project.published}
                                            onChange={() => togglePublish(project.id)}
                                        />
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="relative inline-block">
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === project.id ? null : project.id)}
                                                className="p-2 rounded-lg hover:bg-background-tertiary transition-colors"
                                            >
                                                <MoreVertical className="w-5 h-5 text-foreground-muted" />
                                            </button>

                                            {openMenuId === project.id && (
                                                <>
                                                    <div
                                                        className="fixed inset-0 z-10"
                                                        onClick={() => setOpenMenuId(null)}
                                                    />
                                                    <div className="absolute right-0 top-full mt-1 w-48 py-2 bg-background-secondary border border-border rounded-lg shadow-xl z-20">
                                                        <Link
                                                            href={`/project/${project.id}`}
                                                            target="_blank"
                                                            className="flex items-center gap-3 px-4 py-2 text-foreground-muted hover:bg-background-tertiary hover:text-foreground"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                            View Live
                                                        </Link>
                                                        <Link
                                                            href={`/admin/projects/${project.id}`}
                                                            className="flex items-center gap-3 px-4 py-2 text-foreground-muted hover:bg-background-tertiary hover:text-foreground"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteProject(project.id)}
                                                            className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 w-full text-left"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredProjects.length === 0 && (
                    <div className="p-8 text-center">
                        <p className="text-foreground-muted">No projects found</p>
                    </div>
                )}
            </Card>
        </div>
    )
}
