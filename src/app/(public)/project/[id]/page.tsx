'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Container, Section, Button } from '@/components/ui'
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Briefcase } from 'lucide-react'

// Temporary mock data - will be replaced with API fetch
const mockProject = {
    id: '1',
    title: 'FinTech Dashboard',
    tagline: 'Increased user engagement by 40% through redesigned analytics experience',
    coverImage: null,
    tags: ['Product Management', 'FinTech', 'B2B SaaS'],
    problem: `The existing analytics dashboard was cluttered and confusing, leading to low adoption rates (only 15% of users actively used it). Users struggled to find relevant metrics, and the learning curve was steep. This resulted in churn and reduced customer satisfaction scores.`,
    role: `As the Lead Product Manager, I owned the end-to-end redesign initiative. I led a cross-functional team of 6 (2 designers, 3 engineers, 1 data analyst) and reported directly to the VP of Product. My responsibilities included user research, defining the product vision, prioritization, and go-to-market strategy.`,
    constraints: `
- 3-month timeline with fixed engineering resources
- Had to maintain backward compatibility for existing power users
- Limited budget for user research (relied on existing customer success data)
- Needed to ship incrementally to reduce risk
`,
    solution: `
**Discovery & Research**
- Analyzed 500+ support tickets to identify pain points
- Conducted 20 user interviews across different segments
- Created user journey maps and identified 5 key personas

**Product Strategy**
- Defined a "progressive disclosure" UX pattern: show simple insights by default, with drill-down for power users
- Prioritized top 10 metrics based on usage data and customer requests
- Designed a customizable widget system for personalization

**Execution**
- Led 2-week sprints with clear acceptance criteria
- Shipped beta to 50 enterprise customers for early feedback
- Iterated based on quantitative and qualitative feedback
`,
    impact: `
- **40% increase** in daily active users of the dashboard
- **NPS improved from 32 to 58** (25+ point increase)
- **Reduced support tickets** related to analytics by 60%
- **Reduced time-to-insight** from 5 min to under 1 min
- Feature became a key differentiator in sales conversations
`,
    caseStudies: [
        { id: 'cs1', title: 'Full Case Study', thumbnailUrl: null }
    ],
}

export default function ProjectDetailPage() {
    const project = mockProject

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-16 hero-gradient">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Work
                        </Link>

                        <div className="flex flex-wrap gap-3 mb-6">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-1.5 text-sm font-medium bg-accent/10 text-accent rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-display font-display font-bold text-foreground mb-6">
                            {project.title}
                        </h1>

                        <p className="text-xl text-foreground-muted max-w-3xl">
                            {project.tagline}
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Cover Image */}
            {project.coverImage && (
                <Section className="py-0 -mt-8">
                    <Container>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-border"
                        >
                            <Image
                                src={project.coverImage}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </Container>
                </Section>
            )}

            {/* Case Study Content */}
            <Section>
                <Container size="md">
                    <div className="space-y-16">
                        {/* Problem */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                                    <span className="text-red-400 font-bold">!</span>
                                </div>
                                <h2 className="text-2xl font-display font-bold text-foreground">The Problem</h2>
                            </div>
                            <div className="pl-14">
                                <p className="text-foreground-muted leading-relaxed whitespace-pre-line">
                                    {project.problem}
                                </p>
                            </div>
                        </motion.div>

                        {/* Role */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-accent" />
                                </div>
                                <h2 className="text-2xl font-display font-bold text-foreground">My Role</h2>
                            </div>
                            <div className="pl-14">
                                <p className="text-foreground-muted leading-relaxed whitespace-pre-line">
                                    {project.role}
                                </p>
                            </div>
                        </motion.div>

                        {/* Constraints */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-yellow-400" />
                                </div>
                                <h2 className="text-2xl font-display font-bold text-foreground">Constraints</h2>
                            </div>
                            <div className="pl-14">
                                <p className="text-foreground-muted leading-relaxed whitespace-pre-line">
                                    {project.constraints}
                                </p>
                            </div>
                        </motion.div>

                        {/* Solution */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                    <span className="text-green-400 font-bold">✓</span>
                                </div>
                                <h2 className="text-2xl font-display font-bold text-foreground">The Solution</h2>
                            </div>
                            <div className="pl-14">
                                <div className="prose prose-invert prose-lg max-w-none">
                                    <p className="text-foreground-muted leading-relaxed whitespace-pre-line">
                                        {project.solution}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Impact */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center">
                                    <span className="text-accent-secondary font-bold text-lg">📈</span>
                                </div>
                                <h2 className="text-2xl font-display font-bold text-foreground">Impact & Results</h2>
                            </div>
                            <div className="pl-14">
                                <div className="p-6 rounded-2xl bg-background-secondary border border-border">
                                    <p className="text-foreground-muted leading-relaxed whitespace-pre-line">
                                        {project.impact}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* View Full Case Study CTA */}
                        {project.caseStudies.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="pt-8 border-t border-border"
                            >
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl glass">
                                    <div>
                                        <h3 className="text-xl font-display font-bold text-foreground mb-2">
                                            Want the full story?
                                        </h3>
                                        <p className="text-foreground-muted">
                                            View the complete case study with detailed analysis and artifacts.
                                        </p>
                                    </div>
                                    <Link href={`/view/${project.caseStudies[0].id}`}>
                                        <span className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-background font-semibold rounded-lg hover:shadow-glow transition-all duration-300">
                                            View Case Study
                                            <ExternalLink className="w-5 h-5" />
                                        </span>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </Container>
            </Section>

            {/* Navigation */}
            <Section className="bg-background-secondary">
                <Container>
                    <div className="flex justify-between items-center">
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            All Projects
                        </Link>
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
                        >
                            Next Project
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </Container>
            </Section>
        </>
    )
}
