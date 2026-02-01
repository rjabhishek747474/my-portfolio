// Portfolio data - edit this file to update your content
// This file serves as the data source for the portfolio

export interface ProfileData {
    name: string
    title: string
    company: string
    tagline: string
    bio: string
    email: string
    linkedinUrl: string
    resumeUrl: string
}

export interface WorkExperience {
    id: string
    company: string
    role: string
    period: string
    description: string
}

export interface CaseStudy {
    id: string
    icon: 'coins' | 'video' | 'message' | 'zap' | 'globe'
    iconColor: 'green' | 'blue' | 'purple' | 'orange' | 'pink'
    title: string
    subtitle: string
    description: string
    link: string
}

export interface FreelanceProject {
    id: string
    name: string
    company: string
    role: string
    period: string
    description: string
    link: string | null
}

export interface Recognition {
    id: string
    title: string
    organization: string
    date: string
    description: string
    imageGradient: string // e.g., 'from-purple-600 to-blue-600'
}

export interface OutsideWork {
    id: string
    title: string
    emoji: string
    description: string
    imageGradient: string
}

export interface PortfolioData {
    profile: ProfileData
    workExperience: WorkExperience[]
    caseStudies: CaseStudy[]
    freelanceProjects: FreelanceProject[]
    recognition: Recognition[]
    outsideWork: OutsideWork[]
    aiProjects: { id: string; title: string; description: string }[]
}

// Default portfolio data - EDIT THIS TO UPDATE YOUR PORTFOLIO
export const portfolioData: PortfolioData = {
    profile: {
        name: 'Aishwarya Jaiswal',
        title: 'Product Manager 2',
        company: 'Microsoft (Azure Marketplaces)',
        tagline: 'Curious being who loves experimenting & shipping things.',
        bio: 'Product Manager with experience building SaaS products in cloud infrastructure for both B2B and B2C users. Also worked as a Product & Growth Consultant for 6 startups, leading and scaling multiple 0→1 product builds in the B2C domain.',
        email: 'hello@example.com',
        linkedinUrl: 'https://linkedin.com',
        resumeUrl: '/resume.pdf',
    },
    workExperience: [
        {
            id: 'exp-1',
            company: 'Microsoft (Azure Marketplaces)',
            role: 'Product Manager 2',
            period: 'Jan 2024 - Present',
            description: 'Leading marketplace initiatives for Azure, working on vendor onboarding and transaction optimization.',
        },
        {
            id: 'exp-2',
            company: 'Tech Startup',
            role: 'Senior Product Manager',
            period: '2022 - 2023',
            description: 'Led product strategy for AI-powered productivity tools. Grew MAU from 10K to 100K.',
        },
        {
            id: 'exp-3',
            company: 'FinTech Company',
            role: 'Product Manager',
            period: '2020 - 2022',
            description: 'Owned the analytics and reporting suite. Increased user engagement by 40%.',
        },
        {
            id: 'exp-4',
            company: 'E-commerce Platform',
            role: 'Associate PM',
            period: '2018 - 2020',
            description: 'Built marketplace features that drove $2M in incremental revenue.',
        },
    ],
    caseStudies: [
        {
            id: 'jar',
            icon: 'coins',
            iconColor: 'green',
            title: 'JAR - Micro-investment app',
            subtitle: 'Solving JAR growth problem, taking 1.5 Million Monthly Active Savers to 6 Million Monthly Active Savers within a year',
            description: 'With over close to 80 User Interviews and multiple discussion with JAR Product & Marketing Team, I have created a growth strategy for JAR focusing on three different growth levers.',
            link: '/view/jar',
        },
        {
            id: 'loom',
            icon: 'video',
            iconColor: 'blue',
            title: 'Loom',
            subtitle: 'Retention & Engagement for Loom',
            description: 'This document discusses the engagement & retention strategy for Loom, a video messaging app. It includes information on ICPs and prioritization, user goals, and JTBD.',
            link: '/view/loom',
        },
        {
            id: 'discord',
            icon: 'message',
            iconColor: 'purple',
            title: 'Discord',
            subtitle: 'Community Growth Strategy',
            description: 'A comprehensive analysis of Discord\'s community features and growth levers. Proposed product improvements for better server discovery and engagement.',
            link: '/view/discord',
        },
    ],
    freelanceProjects: [
        {
            id: 'surgence',
            name: 'Surgence',
            company: 'Web3 Marketing Collective',
            role: 'Core Team | Marketing & Growth',
            period: 'Jun 2024 – Nov 2024',
            description: 'Provided growth and marketing consultation for Web3 companies such as QORPO World and iAgent, driving social media visibility and community engagement.',
            link: '#',
        },
        {
            id: 'possobuild',
            name: 'PossoBuild',
            company: 'AI Interview Platform',
            role: 'Core Team | Product & Growth',
            period: 'Aug 2023 – Mar 2024',
            description: 'Launched the initial onboarding flow, taking the platform from 0 → 200+ active users (including 10+ B2B hiring teams) in its first release.',
            link: '#',
        },
        {
            id: 'vtru',
            name: 'VTRU Dreamers DAO',
            company: 'NFT & Artist Community',
            role: 'Core Team | Product & Growth',
            period: 'Jun 2022 – Apr 2023',
            description: 'Orchestrated both online and offline product launches to drive NFT adoption. Built and scaled a vibrant community of 20,000+ artists across Southeast Asia.',
            link: null,
        },
    ],
    recognition: [
        {
            id: 'rec-1',
            title: 'The Product Folks Workshop',
            organization: 'N8N Build Session for PMs',
            date: 'August 2025',
            description: 'An exclusive hands-on n8n workshop for Product Managers and builders. Conducted a 4-hour workshop on building AI agents from scratch.',
            imageGradient: 'from-purple-600 to-blue-600',
        },
        {
            id: 'rec-2',
            title: 'OaaS Product Excellence',
            organization: 'Microsoft Monthly Marvel',
            date: 'March 2025',
            description: 'Recognized for gathering valuable insights from top OaaS users and authoring comprehensive wiki documentation.',
            imageGradient: 'from-blue-800 to-blue-600',
        },
    ],
    outsideWork: [
        {
            id: 'cycling',
            title: 'Cycling',
            emoji: '🚴',
            description: 'What better way to explore Bangalore than cycling? Pulled off 100 km rides in one go and attempted the iconic Manali-Leh cycling expedition.',
            imageGradient: 'from-green-400 to-emerald-600',
        },
        {
            id: 'events',
            title: 'Events & Hosting',
            emoji: '📅',
            description: 'Enjoy hosting communities and events both offline and online. Curated Namastey NFT and multiple Twitter Spaces with creators and founders.',
            imageGradient: 'from-orange-400 to-red-500',
        },
    ],
    aiProjects: [
        {
            id: 'ai-1',
            title: 'Coming Soon',
            description: 'AI side projects and experiments',
        },
    ],
}
