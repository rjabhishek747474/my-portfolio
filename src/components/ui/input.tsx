import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-foreground-muted">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={cn(
                    'w-full px-4 py-3 bg-background-secondary border border-border rounded-lg',
                    'text-foreground placeholder:text-foreground-subtle',
                    'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent',
                    'transition-all duration-200',
                    error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                    className
                )}
                {...props}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-foreground-muted">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                className={cn(
                    'w-full px-4 py-3 bg-background-secondary border border-border rounded-lg',
                    'text-foreground placeholder:text-foreground-subtle',
                    'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent',
                    'transition-all duration-200 resize-none',
                    error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                    className
                )}
                rows={4}
                {...props}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    options: { value: string; label: string }[]
}

export function Select({ label, error, options, className, id, ...props }: SelectProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-foreground-muted">
                    {label}
                </label>
            )}
            <select
                id={id}
                className={cn(
                    'w-full px-4 py-3 bg-background-secondary border border-border rounded-lg',
                    'text-foreground',
                    'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent',
                    'transition-all duration-200',
                    error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                    className
                )}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}

interface SwitchProps {
    label?: string
    checked: boolean
    onChange: (checked: boolean) => void
    disabled?: boolean
}

export function Switch({ label, checked, onChange, disabled }: SwitchProps) {
    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                />
                <div
                    className={cn(
                        'w-12 h-6 rounded-full transition-colors duration-200',
                        checked ? 'bg-accent' : 'bg-background-tertiary'
                    )}
                />
                <div
                    className={cn(
                        'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200',
                        checked && 'translate-x-6'
                    )}
                />
            </div>
            {label && <span className="ml-3 text-sm text-foreground-muted">{label}</span>}
        </label>
    )
}
