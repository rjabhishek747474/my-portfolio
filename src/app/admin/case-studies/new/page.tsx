'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, Input, Button, Switch, Select } from '@/components/ui'
import { ArrowLeft, Save, Link as LinkIcon, FileText, AlertCircle } from 'lucide-react'

// Mock projects for dropdown
const mockProjects = [
    { value: '1', label: 'FinTech Dashboard' },
    { value: '2', label: 'E-Commerce Platform' },
    { value: '3', label: 'AI Writing Assistant' },
    { value: '4', label: 'Healthcare App' },
    { value: '5', label: 'Developer Tools' },
    { value: '6', label: 'Social Commerce' },
]

export default function NewCaseStudyPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [driveInput, setDriveInput] = useState('')
    const [driveError, setDriveError] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        projectId: '',
        isPublic: false,
        watermarkEnabled: true,
        watermarkText: 'Confidential © 2024',
    })

    const validateDriveInput = (input: string) => {
        if (!input.trim()) {
            setDriveError('Google Drive link or file ID is required')
            return false
        }

        // Check if it's a valid file ID or URL
        const isValidId = /^[\w-]{20,}$/.test(input)
        const isValidUrl = input.includes('drive.google.com') || input.includes('docs.google.com')

        if (!isValidId && !isValidUrl) {
            setDriveError('Please enter a valid Google Drive file ID or link')
            return false
        }

        setDriveError('')
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateDriveInput(driveInput)) return
        if (!formData.projectId) return

        setIsSubmitting(true)

        try {
            // API call will go here
            console.log('Creating case study:', { ...formData, driveInput })
            await new Promise(resolve => setTimeout(resolve, 1500))
            router.push('/admin/case-studies')
        } catch (error) {
            console.error('Error creating case study:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/case-studies"
                    className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-foreground-muted" />
                </Link>
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">Add Case Study</h1>
                    <p className="text-foreground-muted">Link a PDF from Google Drive</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Google Drive Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card hover={false} className="p-6 space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                <LinkIcon className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <h2 className="text-lg font-display font-bold text-foreground">Google Drive Link</h2>
                                <p className="text-sm text-foreground-muted">Paste the link or file ID of your PDF</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <input
                                type="text"
                                value={driveInput}
                                onChange={(e) => {
                                    setDriveInput(e.target.value)
                                    if (driveError) validateDriveInput(e.target.value)
                                }}
                                placeholder="https://drive.google.com/file/d/... or just the file ID"
                                className={`w-full px-4 py-3 bg-background-secondary border rounded-lg text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-1 transition-all ${driveError
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                        : 'border-border focus:border-accent focus:ring-accent'
                                    }`}
                            />
                            {driveError && (
                                <p className="flex items-center gap-2 text-sm text-red-400">
                                    <AlertCircle className="w-4 h-4" />
                                    {driveError}
                                </p>
                            )}
                        </div>

                        <div className="p-4 rounded-lg bg-background-tertiary">
                            <p className="text-sm text-foreground-muted">
                                <strong className="text-foreground">Tip:</strong> Make sure the PDF is accessible
                                to your service account, or share it with the service account email.
                            </p>
                        </div>
                    </Card>
                </motion.div>

                {/* Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                >
                    <Card hover={false} className="p-6 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-accent" />
                            </div>
                            <h2 className="text-lg font-display font-bold text-foreground">Case Study Details</h2>
                        </div>

                        <Input
                            id="title"
                            label="Title"
                            placeholder="e.g., FinTech Dashboard - Full Case Study"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            required
                        />

                        <Select
                            id="project"
                            label="Link to Project"
                            options={[
                                { value: '', label: 'Select a project...' },
                                ...mockProjects
                            ]}
                            value={formData.projectId}
                            onChange={(e) => setFormData(prev => ({ ...prev, projectId: e.target.value }))}
                            required
                        />
                    </Card>
                </motion.div>

                {/* Visibility & Watermark */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <Card hover={false} className="p-6 space-y-6">
                        <h2 className="text-lg font-display font-bold text-foreground">Visibility & Protection</h2>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-background-tertiary">
                            <div>
                                <h3 className="font-medium text-foreground">Publish Case Study</h3>
                                <p className="text-sm text-foreground-muted">Make visible on your public portfolio</p>
                            </div>
                            <Switch
                                checked={formData.isPublic}
                                onChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-background-tertiary">
                            <div>
                                <h3 className="font-medium text-foreground">Enable Watermark</h3>
                                <p className="text-sm text-foreground-muted">Add a watermark overlay on each page</p>
                            </div>
                            <Switch
                                checked={formData.watermarkEnabled}
                                onChange={(checked) => setFormData(prev => ({ ...prev, watermarkEnabled: checked }))}
                            />
                        </div>

                        {formData.watermarkEnabled && (
                            <Input
                                id="watermarkText"
                                label="Watermark Text"
                                placeholder="e.g., Confidential © 2024"
                                value={formData.watermarkText}
                                onChange={(e) => setFormData(prev => ({ ...prev, watermarkText: e.target.value }))}
                            />
                        )}
                    </Card>
                </motion.div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4">
                    <Link href="/admin/case-studies">
                        <Button type="button" variant="ghost">Cancel</Button>
                    </Link>
                    <Button type="submit" isLoading={isSubmitting}>
                        <Save className="w-4 h-4 mr-2" />
                        Add Case Study
                    </Button>
                </div>
            </form>
        </div>
    )
}
