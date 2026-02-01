/**
 * Portfolio Data Types Tests
 * Tests for the portfolio.ts types and data structure
 */

import { portfolioData } from '@/data/portfolio'

describe('Portfolio Data Export', () => {
    test('portfolioData is exported', () => {
        expect(portfolioData).toBeDefined()
    })

    test('has profile object', () => {
        expect(portfolioData.profile).toBeDefined()
        expect(typeof portfolioData.profile).toBe('object')
    })

    test('has workExperience array', () => {
        expect(portfolioData.workExperience).toBeDefined()
        expect(Array.isArray(portfolioData.workExperience)).toBe(true)
    })

    test('has caseStudies array', () => {
        expect(portfolioData.caseStudies).toBeDefined()
        expect(Array.isArray(portfolioData.caseStudies)).toBe(true)
    })

    test('has freelanceProjects array', () => {
        expect(portfolioData.freelanceProjects).toBeDefined()
        expect(Array.isArray(portfolioData.freelanceProjects)).toBe(true)
    })

    test('has recognition array', () => {
        expect(portfolioData.recognition).toBeDefined()
        expect(Array.isArray(portfolioData.recognition)).toBe(true)
    })

    test('has outsideWork array', () => {
        expect(portfolioData.outsideWork).toBeDefined()
        expect(Array.isArray(portfolioData.outsideWork)).toBe(true)
    })

    test('has aiProjects array', () => {
        expect(portfolioData.aiProjects).toBeDefined()
        expect(Array.isArray(portfolioData.aiProjects)).toBe(true)
    })
})

describe('Profile Data Validation', () => {
    const { profile } = portfolioData

    test('name is a non-empty string', () => {
        expect(typeof profile.name).toBe('string')
        expect(profile.name.length).toBeGreaterThan(0)
    })

    test('title is a non-empty string', () => {
        expect(typeof profile.title).toBe('string')
        expect(profile.title.length).toBeGreaterThan(0)
    })

    test('company is a non-empty string', () => {
        expect(typeof profile.company).toBe('string')
        expect(profile.company.length).toBeGreaterThan(0)
    })

    test('email is a valid format', () => {
        expect(typeof profile.email).toBe('string')
        expect(profile.email).toMatch(/@/)
    })

    test('linkedinUrl is a valid URL format', () => {
        expect(typeof profile.linkedinUrl).toBe('string')
        expect(profile.linkedinUrl).toMatch(/^https?:\/\//)
    })
})

describe('Work Experience Validation', () => {
    test('each work experience has required fields', () => {
        portfolioData.workExperience.forEach((exp) => {
            expect(exp).toHaveProperty('id')
            expect(exp).toHaveProperty('company')
            expect(exp).toHaveProperty('role')
            expect(exp).toHaveProperty('period')
            expect(exp).toHaveProperty('description')
        })
    })

    test('work experience IDs are unique', () => {
        const ids = portfolioData.workExperience.map((exp) => exp.id)
        const uniqueIds = Array.from(new Set(ids))
        expect(ids.length).toBe(uniqueIds.length)
    })
})

describe('Case Studies Validation', () => {
    test('each case study has required fields', () => {
        portfolioData.caseStudies.forEach((study) => {
            expect(study).toHaveProperty('id')
            expect(study).toHaveProperty('title')
            expect(study).toHaveProperty('description')
            expect(study).toHaveProperty('link')
        })
    })

    test('case study IDs are unique', () => {
        const ids = portfolioData.caseStudies.map((s) => s.id)
        const uniqueIds = Array.from(new Set(ids))
        expect(ids.length).toBe(uniqueIds.length)
    })
})

describe('Freelance Projects Validation', () => {
    test('each freelance project has required fields', () => {
        portfolioData.freelanceProjects.forEach((project) => {
            expect(project).toHaveProperty('id')
            expect(project).toHaveProperty('name')
            expect(project).toHaveProperty('company')
            expect(project).toHaveProperty('role')
        })
    })
})

describe('Recognition Validation', () => {
    test('each recognition has required fields', () => {
        portfolioData.recognition.forEach((rec) => {
            expect(rec).toHaveProperty('id')
            expect(rec).toHaveProperty('title')
            expect(rec).toHaveProperty('organization')
        })
    })
})

describe('Outside Work Validation', () => {
    test('each outside work has required fields', () => {
        portfolioData.outsideWork.forEach((item) => {
            expect(item).toHaveProperty('id')
            expect(item).toHaveProperty('title')
            expect(item).toHaveProperty('description')
        })
    })
})
