'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface CardProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode
    hover?: boolean
    glass?: boolean
}

export function Card({
    children,
    className,
    hover = true,
    glass = false,
    ...props
}: CardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -8 } : undefined}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={cn(
                'rounded-2xl border border-border overflow-hidden',
                glass ? 'glass' : 'bg-background-secondary',
                hover && 'card-hover cursor-pointer',
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    )
}

interface ProjectCardProps {
    id: string
    title: string
    tagline: string
    coverImage: string | null
    tags: string[]
}

export function ProjectCard({ id, title, tagline, coverImage, tags }: ProjectCardProps) {
    return (
        <Link href={`/project/${id}`}>
            <Card className="group h-full">
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-background-tertiary">
                    {coverImage ? (
                        <Image
                            src={coverImage}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                                <span className="text-2xl text-accent font-bold">
                                    {title.charAt(0)}
                                </span>
                            </div>
                        </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {title}
                    </h3>
                    <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
                        {tagline}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl" style={{
                        boxShadow: 'inset 0 0 60px rgba(0, 212, 255, 0.1)'
                    }} />
                </div>
            </Card>
        </Link>
    )
}
