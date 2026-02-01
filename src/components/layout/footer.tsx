import React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const socialLinks = [
    { href: '#', icon: Github, label: 'GitHub' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: 'mailto:hello@example.com', icon: Mail, label: 'Email' },
]

export function Footer() {
    return (
        <footer className="border-t border-border py-12">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo & Copyright */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <Link href="/" className="text-xl font-bold font-display">
                            <span className="gradient-text">Portfolio</span>
                        </Link>
                        <p className="text-sm text-foreground-subtle">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-lg bg-background-secondary border border-border text-foreground-muted hover:text-accent hover:border-accent/50 transition-all duration-200"
                                aria-label={social.label}
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    )
}
