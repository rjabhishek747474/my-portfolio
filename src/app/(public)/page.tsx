'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Linkedin,
    Mail,
    FileText,
    ChevronDown,
    Cpu,
    Briefcase,
    BookOpen,
    Rocket,
    Award,
    Heart,
    ArrowRight,
    Video,
    MessageCircle,
    Coins,
    Zap,
    Globe
} from 'lucide-react'
import { portfolioData } from '@/data/portfolio'

// Icon mapping for case studies
const iconMap = {
    coins: Coins,
    video: Video,
    message: MessageCircle,
    zap: Zap,
    globe: Globe,
}

// Section configuration
const sections = [
    {
        id: 'ai-projects',
        title: 'AI Projects',
        subtitle: 'Hands-on Experimentation & Implementation',
        color: 'purple',
        icon: Cpu,
        count: portfolioData.aiProjects.length,
    },
    {
        id: 'work-experience',
        title: 'Work Experience',
        subtitle: 'Professional journey',
        color: 'blue',
        icon: Briefcase,
        count: portfolioData.workExperience.length,
    },
    {
        id: 'case-studies',
        title: 'Case Studies',
        subtitle: 'In-depth product breakdowns',
        color: 'green',
        icon: BookOpen,
        count: portfolioData.caseStudies.length,
    },
    {
        id: 'freelance-projects',
        title: 'Freelance Projects',
        subtitle: 'Work that pushed my boundaries',
        color: 'orange',
        icon: Rocket,
        count: portfolioData.freelanceProjects.length,
    },
    {
        id: 'recognition',
        title: 'Recognition',
        subtitle: 'Speaking engagements & awards',
        color: 'pink',
        icon: Award,
        count: portfolioData.recognition.length,
    },
    {
        id: 'outside-work',
        title: 'Outside Work',
        subtitle: 'Freediving · Cycling · Events',
        color: 'teal',
        icon: Heart,
        count: portfolioData.outsideWork.length,
    },
]

// Color mapping for sections
const sectionColors: Record<string, { border: string; bg: string; text: string }> = {
    purple: { border: '#8b7cf6', bg: '#f3f0ff', text: '#7c3aed' },
    blue: { border: '#6bb3e8', bg: '#eff6ff', text: '#2563eb' },
    green: { border: '#7dd3a8', bg: '#f0fdf4', text: '#16a34a' },
    orange: { border: '#f5a855', bg: '#fff7ed', text: '#ea580c' },
    pink: { border: '#e891b0', bg: '#fdf2f8', text: '#db2777' },
    teal: { border: '#5ebdbd', bg: '#f0fdfa', text: '#0d9488' },
}

// Accordion Section Component
function AccordionSection({
    section,
    isOpen,
    onToggle,
    children
}: {
    section: typeof sections[0]
    isOpen: boolean
    onToggle: () => void
    children: React.ReactNode
}) {
    const contentRef = useRef<HTMLDivElement>(null)
    const colors = sectionColors[section.color] || sectionColors.purple

    return (
        <div
            className="bg-white rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
            style={{ borderLeftWidth: '3px', borderLeftColor: colors.border }}
        >
            <button
                onClick={onToggle}
                className="section-header w-full"
            >
                <div className="flex items-start gap-1">
                    <div className="text-left">
                        <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
                        <p className="text-sm text-foreground-subtle">{section.subtitle}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium"
                        style={{ backgroundColor: colors.bg, color: colors.text }}
                    >
                        {section.count}
                    </span>
                    <ChevronDown
                        className={`w-5 h-5 text-foreground-subtle transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="overflow-hidden"
                    >
                        <div ref={contentRef} className="px-5 pb-5 border-t border-border">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Sidebar Component
function Sidebar() {
    const [profile, setProfile] = React.useState(portfolioData.profile)

    React.useEffect(() => {
        fetch('/api/portfolio')
            .then(res => res.json())
            .then(data => {
                if (data.profile) {
                    setProfile(data.profile)
                    // Update the browser tab title dynamically
                    document.title = `${data.profile.name} | Product Manager`
                }
            })
            .catch(console.error)
    }, [])

    return (
        <aside className="layout-sidebar">
            <div className="flex flex-col h-full">
                {/* Profile Photo */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-32 h-32">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center avatar-ring">
                            {/* Placeholder avatar - replace with actual image */}
                            <svg viewBox="0 0 100 100" className="w-24 h-24">
                                <circle cx="50" cy="35" r="20" fill="#1a1a1a" />
                                <circle cx="50" cy="90" r="35" fill="#1a1a1a" />
                                <circle cx="42" cy="32" r="3" fill="white" />
                                <circle cx="58" cy="32" r="3" fill="white" />
                                <rect x="38" y="25" width="8" height="12" rx="1" fill="white" opacity="0.9" />
                                <rect x="54" y="25" width="8" height="12" rx="1" fill="white" opacity="0.9" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Name & Title */}
                <div className="text-center mb-4">
                    <h1 className="text-xl font-bold text-foreground mb-1">{profile.name}</h1>
                    <p className="text-sm text-foreground-muted">
                        {profile.title} @{profile.company}
                    </p>
                </div>

                {/* Tagline */}
                <p className="text-center text-foreground-muted mb-4 text-sm">
                    {profile.tagline}
                </p>

                {/* Bio */}
                <p className="text-sm text-foreground-subtle leading-relaxed mb-6">
                    {profile.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 mt-auto pt-4 border-t border-border">
                    <Link
                        href={profile.linkedinUrl}
                        target="_blank"
                        className="p-2 text-foreground-muted hover:text-foreground transition-colors"
                    >
                        <Linkedin className="w-5 h-5" />
                    </Link>
                    <Link
                        href={`mailto:${profile.email}`}
                        className="p-2 text-foreground-muted hover:text-foreground transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                    </Link>
                    <span className="text-foreground-subtle">|</span>
                    <Link
                        href={profile.resumeUrl}
                        className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
                    >
                        <FileText className="w-4 h-4" />
                        Download Resume
                    </Link>
                </div>
            </div>
        </aside>
    )
}

// Main Page Component
export default function HomePage() {
    const [openSections, setOpenSections] = useState<string[]>([])
    const { workExperience, caseStudies, freelanceProjects, recognition, outsideWork, aiProjects } = portfolioData

    const toggleSection = (id: string) => {
        setOpenSections(prev =>
            prev.includes(id)
                ? prev.filter(s => s !== id)
                : [...prev, id]
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />

            <main className="layout-main">
                <div className="max-w-3xl space-y-4">
                    {/* AI Projects */}
                    <AccordionSection
                        section={sections[0]}
                        isOpen={openSections.includes('ai-projects')}
                        onToggle={() => toggleSection('ai-projects')}
                    >
                        <div className="space-y-4 pt-4">
                            {aiProjects.map((project) => (
                                <div key={project.id} className="bg-background-tertiary rounded-xl p-5">
                                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                                    <p className="text-sm text-foreground-muted">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </AccordionSection>

                    {/* Work Experience */}
                    <AccordionSection
                        section={sections[1]}
                        isOpen={openSections.includes('work-experience')}
                        onToggle={() => toggleSection('work-experience')}
                    >
                        <div className="space-y-6 pt-4">
                            {workExperience.map((exp) => (
                                <div key={exp.id} className="border-b border-border last:border-0 pb-5 last:pb-0">
                                    <h3 className="font-semibold text-foreground">{exp.company}</h3>
                                    <p className="text-foreground-muted font-medium">{exp.role}</p>
                                    <p className="text-sm text-foreground-subtle mb-2">{exp.period}</p>
                                    <p className="text-sm text-foreground-muted">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </AccordionSection>

                    {/* Case Studies */}
                    <AccordionSection
                        section={sections[2]}
                        isOpen={openSections.includes('case-studies')}
                        onToggle={() => toggleSection('case-studies')}
                    >
                        <div className="space-y-4 pt-4">
                            {caseStudies.map((study) => {
                                const IconComponent = iconMap[study.icon] || Coins
                                const iconBg = study.iconColor === 'green' ? 'bg-green-100'
                                    : study.iconColor === 'blue' ? 'bg-blue-100'
                                        : study.iconColor === 'orange' ? 'bg-orange-100'
                                            : study.iconColor === 'pink' ? 'bg-pink-100'
                                                : 'bg-purple-100'
                                const iconText = study.iconColor === 'green' ? 'text-green-600'
                                    : study.iconColor === 'blue' ? 'text-blue-600'
                                        : study.iconColor === 'orange' ? 'text-orange-600'
                                            : study.iconColor === 'pink' ? 'text-pink-600'
                                                : 'text-purple-600'
                                return (
                                    <div key={study.id} className="bg-background-tertiary rounded-xl p-5">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${iconBg} ${iconText}`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-semibold text-foreground text-lg mb-1">{study.title}</h3>
                                        <p className="text-foreground-muted font-medium text-sm mb-3">{study.subtitle}</p>
                                        <p className="text-sm text-foreground-subtle mb-4">{study.description}</p>
                                        <Link href={study.link} className="text-accent font-medium inline-flex items-center gap-1 hover:underline text-sm">
                                            Case Study Link <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </AccordionSection>

                    {/* Freelance Projects */}
                    <AccordionSection
                        section={sections[3]}
                        isOpen={openSections.includes('freelance-projects')}
                        onToggle={() => toggleSection('freelance-projects')}
                    >
                        <div className="space-y-4 pt-4">
                            {freelanceProjects.map((project) => (
                                <div key={project.id} className="bg-background-tertiary rounded-xl p-5">
                                    <h3 className="font-semibold text-foreground text-lg">{project.name}</h3>
                                    <p className="text-foreground-subtle text-sm">{project.company}</p>
                                    <p className="text-foreground-muted font-medium text-sm">{project.role}</p>
                                    <p className="text-sm text-foreground-subtle mb-3">{project.period}</p>
                                    <p className="text-sm text-foreground-muted mb-4">{project.description}</p>
                                    {project.link && (
                                        <Link href={project.link} className="text-accent font-medium inline-flex items-center gap-1 hover:underline text-sm">
                                            Visit Website <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </AccordionSection>

                    {/* Recognition */}
                    <AccordionSection
                        section={sections[4]}
                        isOpen={openSections.includes('recognition')}
                        onToggle={() => toggleSection('recognition')}
                    >
                        <div className="space-y-4 pt-4">
                            {recognition.map((rec) => (
                                <div key={rec.id} className="flex gap-4 bg-background-tertiary rounded-xl p-4">
                                    <div className={`w-32 h-24 bg-gradient-to-br ${rec.imageGradient} rounded-lg flex-shrink-0`} />
                                    <div>
                                        <h3 className="font-semibold text-foreground">{rec.title}</h3>
                                        <p className="text-sm text-foreground-muted">{rec.organization}</p>
                                        <p className="text-xs text-foreground-subtle mb-2">{rec.date}</p>
                                        <p className="text-sm text-foreground-muted">{rec.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionSection>

                    {/* Outside Work */}
                    <AccordionSection
                        section={sections[5]}
                        isOpen={openSections.includes('outside-work')}
                        onToggle={() => toggleSection('outside-work')}
                    >
                        <div className="grid md:grid-cols-2 gap-4 pt-4">
                            {outsideWork.map((item) => (
                                <div key={item.id} className="bg-background-tertiary rounded-xl overflow-hidden">
                                    <div className={`h-40 bg-gradient-to-br ${item.imageGradient}`} />
                                    <div className="p-4">
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-full text-xs font-medium text-foreground-muted mb-2">
                                            {item.emoji} {item.title}
                                        </span>
                                        <p className="text-sm text-foreground-muted">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionSection>
                </div>

                {/* Footer */}
                <div className="mt-16 text-center">
                    <p className="text-foreground-subtle text-sm">Thank You :)</p>
                </div>
            </main>
        </div>
    )
}
