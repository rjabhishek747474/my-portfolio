'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { ArrowLeft, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from 'lucide-react'

interface PageData {
    pageNumber: number
    imageUrl: string
    width: number
    height: number
}

interface CaseStudyData {
    id: string
    title: string
    projectTitle: string
    projectId: string
    totalPages: number
    watermarkEnabled: boolean
    watermarkText?: string
}

// Mock data - will be replaced with API
const mockCaseStudy: CaseStudyData = {
    id: 'cs1',
    title: 'FinTech Dashboard - Full Case Study',
    projectTitle: 'FinTech Dashboard',
    projectId: '1',
    totalPages: 12,
    watermarkEnabled: true,
    watermarkText: 'Confidential © 2024',
}

export default function CaseStudyViewerPage() {
    const [caseStudy] = useState<CaseStudyData>(mockCaseStudy)
    const [pages, setPages] = useState<PageData[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [zoom, setZoom] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)

    // Disable right-click
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault()
            return false
        }

        document.addEventListener('contextmenu', handleContextMenu)
        return () => document.removeEventListener('contextmenu', handleContextMenu)
    }, [])

    // Disable keyboard shortcuts for saving
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p')) {
                e.preventDefault()
                return false
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Load pages (mock implementation)
    useEffect(() => {
        setIsLoading(true)
        // Simulate API call to get pages
        setTimeout(() => {
            const mockPages: PageData[] = Array.from({ length: caseStudy.totalPages }, (_, i) => ({
                pageNumber: i + 1,
                imageUrl: `/api/case-studies/${caseStudy.id}/page/${i + 1}`, // Will be signed URL
                width: 1600,
                height: 2263, // A4 aspect ratio
            }))
            setPages(mockPages)
            setIsLoading(false)
        }, 1000)
    }, [caseStudy])

    // Navigation
    const goToPage = useCallback((page: number) => {
        if (page >= 1 && page <= caseStudy.totalPages) {
            setCurrentPage(page)
        }
    }, [caseStudy.totalPages])

    const handleKeyNavigation = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') goToPage(currentPage - 1)
        if (e.key === 'ArrowRight') goToPage(currentPage + 1)
    }, [currentPage, goToPage])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyNavigation)
        return () => document.removeEventListener('keydown', handleKeyNavigation)
    }, [handleKeyNavigation])

    // Zoom controls
    const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 2))
    const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5))

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Top Bar */}
            <div className="sticky top-0 z-50 glass border-b border-border">
                <Container>
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href={`/project/${caseStudy.projectId}`}
                                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-foreground-muted" />
                            </Link>
                            <div>
                                <p className="text-sm text-foreground-subtle">{caseStudy.projectTitle}</p>
                                <h1 className="text-lg font-semibold text-foreground">{caseStudy.title}</h1>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-4">
                            {/* Zoom */}
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background-secondary border border-border">
                                <button
                                    onClick={handleZoomOut}
                                    disabled={zoom <= 0.5}
                                    className="p-1 hover:bg-white/5 rounded disabled:opacity-50"
                                >
                                    <ZoomOut className="w-4 h-4" />
                                </button>
                                <span className="text-sm text-foreground-muted w-14 text-center">
                                    {Math.round(zoom * 100)}%
                                </span>
                                <button
                                    onClick={handleZoomIn}
                                    disabled={zoom >= 2}
                                    className="p-1 hover:bg-white/5 rounded disabled:opacity-50"
                                >
                                    <ZoomIn className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Page indicator */}
                            <div className="flex items-center gap-2 text-sm text-foreground-muted">
                                <span>Page</span>
                                <input
                                    type="number"
                                    min={1}
                                    max={caseStudy.totalPages}
                                    value={currentPage}
                                    onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                                    className="w-12 px-2 py-1 bg-background-secondary border border-border rounded text-center text-foreground"
                                />
                                <span>of {caseStudy.totalPages}</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Viewer Content */}
            <div className="flex-1 flex">
                {/* Page thumbnails sidebar */}
                <div className="hidden lg:block w-48 border-r border-border bg-background-secondary overflow-y-auto">
                    <div className="p-4 space-y-3">
                        {pages.map((page) => (
                            <button
                                key={page.pageNumber}
                                onClick={() => goToPage(page.pageNumber)}
                                className={`w-full aspect-[1/1.414] rounded-lg overflow-hidden border-2 transition-all ${currentPage === page.pageNumber
                                        ? 'border-accent shadow-glow'
                                        : 'border-border hover:border-foreground-subtle'
                                    }`}
                            >
                                <div className="w-full h-full bg-background-tertiary flex items-center justify-center">
                                    <span className="text-foreground-subtle text-sm">{page.pageNumber}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main viewer */}
                <div
                    ref={containerRef}
                    className="flex-1 overflow-auto bg-background-tertiary p-8 flex items-start justify-center no-select"
                >
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center h-96"
                            >
                                <Loader2 className="w-8 h-8 text-accent animate-spin" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="relative shadow-2xl"
                                style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
                            >
                                {/* Page placeholder - will be actual image from API */}
                                <div
                                    className="bg-white rounded-lg overflow-hidden"
                                    style={{
                                        width: '800px',
                                        aspectRatio: '1/1.414'
                                    }}
                                >
                                    {/* Placeholder content */}
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500">
                                        <p className="text-2xl font-bold mb-2">Page {currentPage}</p>
                                        <p className="text-sm">Case Study Content</p>
                                        <p className="text-xs text-gray-400 mt-4">
                                            (PDF page rendered as image)
                                        </p>
                                    </div>
                                </div>

                                {/* Watermark overlay */}
                                {caseStudy.watermarkEnabled && caseStudy.watermarkText && (
                                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                        <p
                                            className="text-4xl font-bold text-black/5 transform -rotate-45 select-none"
                                            style={{ userSelect: 'none' }}
                                        >
                                            {caseStudy.watermarkText}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="sticky bottom-0 glass border-t border-border py-4">
                <Container>
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-background-secondary border border-border text-foreground-muted hover:text-foreground hover:border-foreground-subtle transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>

                        {/* Page dots for mobile */}
                        <div className="flex items-center gap-1 lg:hidden">
                            {Array.from({ length: Math.min(caseStudy.totalPages, 7) }, (_, i) => {
                                const pageNum = i + 1
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => goToPage(pageNum)}
                                        className={`w-2 h-2 rounded-full transition-all ${currentPage === pageNum ? 'bg-accent w-4' : 'bg-foreground-subtle'
                                            }`}
                                    />
                                )
                            })}
                            {caseStudy.totalPages > 7 && (
                                <span className="text-foreground-subtle text-xs ml-1">...</span>
                            )}
                        </div>

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage >= caseStudy.totalPages}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-background-secondary border border-border text-foreground-muted hover:text-foreground hover:border-foreground-subtle transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </Container>
            </div>
        </div>
    )
}
