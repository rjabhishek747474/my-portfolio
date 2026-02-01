'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { Award, Briefcase, GraduationCap, Target } from 'lucide-react'

export default function AboutPage() {
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
                        className="max-w-3xl"
                    >
                        <h1 className="text-display font-display font-bold text-foreground mb-6">
                            About <span className="gradient-text">Me</span>
                        </h1>
                        <p className="text-xl text-foreground-muted leading-relaxed">
                            I&apos;m a Product Manager and entrepreneur passionate about building products
                            that solve real problems. With 5+ years of experience shipping products at
                            scale, I specialize in turning complex challenges into elegant solutions.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Story */}
            <Section>
                <Container size="md">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                <Target className="w-5 h-5 text-accent" />
                            </div>
                            <h2 className="text-2xl font-display font-bold text-foreground">My Journey</h2>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none">
                            <p className="text-foreground-muted leading-relaxed">
                                I started my career as an engineer but quickly realized my passion lay at the
                                intersection of technology and business. I transitioned into product management
                                where I could combine my technical foundation with a deep understanding of user needs.
                            </p>
                            <p className="text-foreground-muted leading-relaxed">
                                Over the years, I&apos;ve led products at both startups and larger companies,
                                always with a focus on measurable impact. I believe in data-driven decisions,
                                rapid iteration, and putting users at the center of everything we build.
                            </p>
                            <p className="text-foreground-muted leading-relaxed">
                                Today, I work with ambitious teams to build products that matter — whether
                                that&apos;s as a PM, advisor, or co-founder. I&apos;m particularly interested in
                                AI, fintech, and developer tools.
                            </p>
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* Experience */}
            <Section className="bg-background-secondary">
                <Container size="md">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-accent" />
                            </div>
                            <h2 className="text-2xl font-display font-bold text-foreground">Experience</h2>
                        </div>

                        <div className="space-y-8">
                            {[
                                {
                                    role: 'Senior Product Manager',
                                    company: 'Tech Startup',
                                    period: '2022 - Present',
                                    description: 'Leading product strategy for AI-powered productivity tools. Grew MAU from 10K to 100K.',
                                },
                                {
                                    role: 'Product Manager',
                                    company: 'FinTech Company',
                                    period: '2020 - 2022',
                                    description: 'Owned the analytics and reporting suite. Increased engagement by 40%.',
                                },
                                {
                                    role: 'Associate PM',
                                    company: 'E-commerce Platform',
                                    period: '2018 - 2020',
                                    description: 'Built marketplace features that drove $2M in incremental revenue.',
                                },
                            ].map((exp, i) => (
                                <motion.div
                                    key={exp.role}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                    className="relative pl-8 border-l-2 border-border"
                                >
                                    <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-accent" />
                                    <p className="text-sm text-accent mb-1">{exp.period}</p>
                                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                                    <p className="text-foreground-muted mb-2">{exp.company}</p>
                                    <p className="text-foreground-subtle">{exp.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* Skills */}
            <Section>
                <Container size="md">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                <Award className="w-5 h-5 text-accent" />
                            </div>
                            <h2 className="text-2xl font-display font-bold text-foreground">What I Do</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { title: 'Product Strategy', desc: 'Defining vision, roadmaps, and go-to-market plans' },
                                { title: 'User Research', desc: 'Conducting interviews, surveys, and usability testing' },
                                { title: 'Data Analysis', desc: 'Building dashboards, analyzing metrics, A/B testing' },
                                { title: 'Cross-functional Leadership', desc: 'Leading engineering, design, and marketing teams' },
                                { title: 'Rapid Prototyping', desc: 'Building quick prototypes to validate ideas' },
                                { title: 'Technical Architecture', desc: 'Deep understanding of APIs, databases, and systems' },
                            ].map((skill, i) => (
                                <motion.div
                                    key={skill.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05, duration: 0.4 }}
                                    className="p-6 rounded-xl border border-border bg-background-secondary"
                                >
                                    <h3 className="text-lg font-bold text-foreground mb-2">{skill.title}</h3>
                                    <p className="text-foreground-muted text-sm">{skill.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </Section>
        </>
    )
}
