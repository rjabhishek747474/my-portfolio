'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import {
    LayoutDashboard,
    FolderKanban,
    FileText,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react'

const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { href: '/admin/case-studies', icon: FileText, label: 'Case Studies' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
]

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = React.useState(false)

    // Don't apply admin layout to login page
    if (pathname === '/admin/login') {
        return <>{children}</>
    }

    // Redirect to login if not authenticated
    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (status === 'unauthenticated') {
        router.push('/admin/login')
        return null
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 glass border-b border-border flex items-center justify-between px-4">
                <Link href="/admin" className="text-xl font-display font-bold">
                    <span className="gradient-text">Admin</span>
                </Link>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-white/5"
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-screen w-64 bg-background-secondary border-r border-border z-40
          transform transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="p-6">
                    <Link href="/admin" className="text-2xl font-display font-bold">
                        <span className="gradient-text">Admin</span>
                    </Link>
                </div>

                <nav className="px-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive
                                        ? 'bg-accent/10 text-accent'
                                        : 'text-foreground-muted hover:bg-white/5 hover:text-foreground'
                                    }
                `}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* User section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
                    <div className="flex items-center gap-3 mb-4 px-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                            <span className="text-accent font-bold">
                                {session?.user?.name?.charAt(0) || 'A'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">
                                {session?.user?.name}
                            </p>
                            <p className="text-sm text-foreground-subtle truncate">
                                {session?.user?.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/admin/login' })}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-foreground-muted hover:bg-white/5 hover:text-foreground transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
