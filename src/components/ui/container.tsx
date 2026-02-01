import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
    children: React.ReactNode
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Container({ children, className, size = 'lg' }: ContainerProps) {
    const sizes = {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-7xl',
        xl: 'max-w-[1400px]',
        full: 'max-w-full',
    }

    return (
        <div className={cn('mx-auto px-6 md:px-8', sizes[size], className)}>
            {children}
        </div>
    )
}

interface SectionProps {
    children: React.ReactNode
    className?: string
    id?: string
}

export function Section({ children, className, id }: SectionProps) {
    return (
        <section id={id} className={cn('py-24 md:py-32', className)}>
            {children}
        </section>
    )
}
