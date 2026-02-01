'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container, Section, ProjectCard } from '@/components/ui'

// Temporary mock data - will be replaced with API call
const mockProjects = [
    {
        id: '1',
        title: 'FinTech Dashboard',
        tagline: 'Increased user engagement by 40% through redesigned analytics experience',
        coverImage: null,
        tags: ['Product', 'FinTech', 'B2B'],
    },
    {
        id: '2',
        title: 'E-Commerce Platform',
        tagline: 'Built 0→1 marketplace that processed $2M in transactions in Year 1',
        coverImage: null,
        tags: ['Product', 'Marketplace', 'Growth'],
    },
    {
        id: '3',
        title: 'AI Writing Assistant',
        tagline: 'Led product strategy for AI tool with 100K+ active users',
        coverImage: null,
        tags: ['AI/ML', 'SaaS', 'B2C'],
    },
    {
        id: '4',
        title: 'Healthcare App',
        tagline: 'Improved patient outcomes by 25% through streamlined care workflows',
        coverImage: null,
        tags: ['Healthcare', 'Mobile', 'B2B'],
    },
    {
        id: '5',
        title: 'Developer Tools',
        tagline: 'Reduced deployment time by 60% with new CI/CD pipeline product',
        coverImage: null,
        tags: ['DevTools', 'Infrastructure', 'B2B'],
    },
    {
        id: '6',
        title: 'Social Commerce',
        tagline: 'Scaled social shopping feature to 500K daily active users',
        coverImage: null,
        tags: ['Social', 'Commerce', 'Mobile'],
    },
]

export default function WorkPage() {
    return (
        <Section className="pt-32">
            <Container>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h1 className="text-display font-display font-bold text-foreground mb-6">
                        Work & <span className="gradient-text">Case Studies</span>
                    </h1>
                    <p className="text-xl text-foreground-muted max-w-2xl">
                        Products I&apos;ve built, problems I&apos;ve solved, and impact I&apos;ve delivered.
                        Each project represents a journey from problem to solution to measurable outcomes.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
