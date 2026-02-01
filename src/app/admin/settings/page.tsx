'use client'

import { useState, useEffect } from 'react'
import { Save, Check, Loader2 } from 'lucide-react'

interface Profile {
    name: string
    title: string
    company: string
    tagline: string
    bio: string
    email: string
    linkedinUrl: string
    resumeUrl: string
}

interface PortfolioData {
    profile: Profile
    workExperience: Array<{
        title: string
        company: string
        period: string
        description: string
        color: string
    }>
    caseStudies: Array<{
        title: string
        description: string
        tags: string[]
        color: string
    }>
    freelanceProjects: Array<{
        title: string
        client: string
        description: string
        color: string
    }>
    recognition: Array<{
        title: string
        organization: string
        year: string
        color: string
    }>
    outsideWork: Array<{
        title: string
        description: string
        color: string
    }>
}

export default function SettingsPage() {
    const [data, setData] = useState<PortfolioData | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await fetch('/api/portfolio')
            if (res.ok) {
                const portfolioData = await res.json()
                setData(portfolioData)
            } else {
                setError('Failed to load data')
            }
        } catch (err) {
            setError('Failed to load data')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleProfileChange = (field: keyof Profile, value: string) => {
        if (!data) return
        setData({
            ...data,
            profile: { ...data.profile, [field]: value }
        })
    }

    const handleSave = async () => {
        if (!data) return

        setSaving(true)
        setError('')

        try {
            const res = await fetch('/api/portfolio', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                setSaved(true)
                setTimeout(() => setSaved(false), 3000)
            } else {
                const result = await res.json()
                setError(result.error || 'Failed to save')
            }
        } catch (err) {
            setError('Failed to save changes')
            console.error(err)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        )
    }

    if (!data) {
        return (
            <div className="text-center text-red-500 py-8">
                {error || 'Failed to load portfolio data'}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600">Manage your portfolio profile information</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${saved
                            ? 'bg-green-500 text-white'
                            : 'bg-amber-600 hover:bg-amber-700 text-white'
                        }`}
                >
                    {saving ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : saved ? (
                        <Check className="w-5 h-5" />
                    ) : (
                        <Save className="w-5 h-5" />
                    )}
                    {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={data.profile.name}
                            onChange={(e) => handleProfileChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title
                        </label>
                        <input
                            type="text"
                            value={data.profile.title}
                            onChange={(e) => handleProfileChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company
                        </label>
                        <input
                            type="text"
                            value={data.profile.company}
                            onChange={(e) => handleProfileChange('company', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.profile.email}
                            onChange={(e) => handleProfileChange('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tagline
                        </label>
                        <input
                            type="text"
                            value={data.profile.tagline}
                            onChange={(e) => handleProfileChange('tagline', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bio
                        </label>
                        <textarea
                            rows={4}
                            value={data.profile.bio}
                            onChange={(e) => handleProfileChange('bio', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            LinkedIn URL
                        </label>
                        <input
                            type="url"
                            value={data.profile.linkedinUrl}
                            onChange={(e) => handleProfileChange('linkedinUrl', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Resume URL
                        </label>
                        <input
                            type="text"
                            value={data.profile.resumeUrl}
                            onChange={(e) => handleProfileChange('resumeUrl', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                    <strong>✨ Changes now persist!</strong> When you save changes, they will automatically
                    appear on the public homepage. Refresh the homepage to see your updates.
                </p>
            </div>
        </div>
    )
}
