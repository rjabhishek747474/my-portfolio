'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container, Section, Input, Textarea, Button } from '@/components/ui'
import { Mail, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
    return (
        <Section className="pt-32">
            <Container size="md">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-display font-display font-bold text-foreground mb-6">
                        Let&apos;s <span className="gradient-text">Connect</span>
                    </h1>
                    <p className="text-xl text-foreground-muted max-w-xl mx-auto">
                        Have a project in mind? Looking for a PM or co-founder?
                        I&apos;m always open to interesting conversations.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-display font-bold text-foreground mb-8">
                            Get in Touch
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <p className="text-sm text-foreground-subtle mb-1">Email</p>
                                    <a
                                        href="mailto:hello@example.com"
                                        className="text-foreground hover:text-accent transition-colors"
                                    >
                                        hello@example.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <p className="text-sm text-foreground-subtle mb-1">Location</p>
                                    <p className="text-foreground">San Francisco, CA</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 rounded-2xl glass">
                            <p className="text-foreground-muted">
                                <span className="text-foreground font-semibold">Response time:</span> I typically
                                respond within 24-48 hours. For urgent matters, please mention it in the subject.
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <form className="space-y-6">
                            <Input
                                id="name"
                                label="Name"
                                placeholder="Your name"
                                required
                            />
                            <Input
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="your@email.com"
                                required
                            />
                            <Input
                                id="subject"
                                label="Subject"
                                placeholder="What's this about?"
                            />
                            <Textarea
                                id="message"
                                label="Message"
                                placeholder="Tell me about your project or idea..."
                                rows={6}
                                required
                            />
                            <Button type="submit" className="w-full">
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </Container>
        </Section>
    )
}
