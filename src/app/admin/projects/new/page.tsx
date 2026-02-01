'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, Input, Textarea, Button, Switch } from '@/components/ui'
import { ArrowLeft, Save, X, Plus } from 'lucide-react'
import Link from 'next/link'

export default function NewProjectPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        tagline: '',
        summary: '',
        problem: '',
        role: '',
        constraints: '',
        solution: '',
        impact: '',
        tags: [] as string[],
        published: false,
    })
    const [newTag, setNewTag] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // API call will go here
            console.log('Creating project:', formData)
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
            router.push('/admin/projects')
        } catch (error) {
            console.error('Error creating project:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }))
            setNewTag('')
        }
    }

    const removeTag = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tag)
        }))
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/projects"
                    className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-foreground-muted" />
                </Link>
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">New Project</h1>
                    <p className="text-foreground-muted">Create a new portfolio project</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card hover={false} className="p-6 space-y-6">
                        <h2 className="text-xl font-display font-bold text-foreground">Basic Information</h2>

                        <Input
                            id="title"
                            label="Project Title"
                            placeholder="e.g., FinTech Dashboard"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            required
                        />

                        <Input
                            id="tagline"
                            label="Tagline"
                            placeholder="One-line description of the project"
                            value={formData.tagline}
                            onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                            required
                        />

                        <Textarea
                            id="summary"
                            label="Summary"
                            placeholder="Brief overview of the project..."
                            value={formData.summary}
                            onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                            rows={3}
                        />

                        {/* Tags */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-foreground-muted">Tags</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {formData.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="hover:text-white"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    placeholder="Add a tag..."
                                    className="flex-1 px-4 py-2 bg-background-secondary border border-border rounded-lg text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-all"
                                />
                                <Button type="button" variant="secondary" onClick={addTag}>
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Case Study Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                >
                    <Card hover={false} className="p-6 space-y-6">
                        <h2 className="text-xl font-display font-bold text-foreground">Case Study Content</h2>
                        <p className="text-foreground-muted text-sm">
                            Structure your project like a PM case study. These sections appear on the project detail page.
                        </p>

                        <Textarea
                            id="problem"
                            label="The Problem"
                            placeholder="What problem were you solving? What was the impact of not solving it?"
                            value={formData.problem}
                            onChange={(e) => setFormData(prev => ({ ...prev, problem: e.target.value }))}
                            rows={4}
                        />

                        <Textarea
                            id="role"
                            label="My Role"
                            placeholder="What was your role? Who did you work with? What were your responsibilities?"
                            value={formData.role}
                            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                            rows={4}
                        />

                        <Textarea
                            id="constraints"
                            label="Constraints"
                            placeholder="What constraints did you face? Timeline, resources, technical limitations?"
                            value={formData.constraints}
                            onChange={(e) => setFormData(prev => ({ ...prev, constraints: e.target.value }))}
                            rows={4}
                        />

                        <Textarea
                            id="solution"
                            label="The Solution"
                            placeholder="What was your approach? How did you solve the problem?"
                            value={formData.solution}
                            onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
                            rows={6}
                        />

                        <Textarea
                            id="impact"
                            label="Impact & Results"
                            placeholder="What were the outcomes? Use metrics where possible."
                            value={formData.impact}
                            onChange={(e) => setFormData(prev => ({ ...prev, impact: e.target.value }))}
                            rows={4}
                        />
                    </Card>
                </motion.div>

                {/* Publishing */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <Card hover={false} className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-foreground">Publish Project</h3>
                                <p className="text-sm text-foreground-muted">
                                    Make this project visible on your public portfolio
                                </p>
                            </div>
                            <Switch
                                checked={formData.published}
                                onChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                            />
                        </div>
                    </Card>
                </motion.div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4">
                    <Link href="/admin/projects">
                        <Button type="button" variant="ghost">Cancel</Button>
                    </Link>
                    <Button type="submit" isLoading={isSubmitting}>
                        <Save className="w-4 h-4 mr-2" />
                        Create Project
                    </Button>
                </div>
            </form>
        </div>
    )
}
