/**
 * Portfolio API Tests
 * Tests for the /api/portfolio endpoint
 */

import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'src/data/portfolio.json')

describe('Portfolio Data File', () => {
    let originalData: string

    beforeAll(() => {
        // Save original data
        originalData = fs.readFileSync(DATA_FILE, 'utf-8')
    })

    afterAll(() => {
        // Restore original data
        fs.writeFileSync(DATA_FILE, originalData, 'utf-8')
    })

    test('portfolio.json file exists', () => {
        expect(fs.existsSync(DATA_FILE)).toBe(true)
    })

    test('portfolio.json contains valid JSON', () => {
        const content = fs.readFileSync(DATA_FILE, 'utf-8')
        expect(() => JSON.parse(content)).not.toThrow()
    })

    test('portfolio.json has required profile fields', () => {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))

        expect(data).toHaveProperty('profile')
        expect(data.profile).toHaveProperty('name')
        expect(data.profile).toHaveProperty('title')
        expect(data.profile).toHaveProperty('company')
        expect(data.profile).toHaveProperty('tagline')
        expect(data.profile).toHaveProperty('bio')
        expect(data.profile).toHaveProperty('email')
        expect(data.profile).toHaveProperty('linkedinUrl')
        expect(data.profile).toHaveProperty('resumeUrl')
    })

    test('portfolio.json profile fields are strings', () => {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))

        expect(typeof data.profile.name).toBe('string')
        expect(typeof data.profile.title).toBe('string')
        expect(typeof data.profile.company).toBe('string')
        expect(typeof data.profile.email).toBe('string')
    })

    test('can read and write portfolio data', () => {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
        const originalName = data.profile.name

        // Modify data
        data.profile.name = 'Test Name'
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')

        // Read back
        const updatedData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
        expect(updatedData.profile.name).toBe('Test Name')

        // Restore
        data.profile.name = originalName
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
    })
})

describe('Portfolio Data Structure', () => {
    test('has workExperience array', () => {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
        expect(Array.isArray(data.workExperience)).toBe(true)
    })

    test('has caseStudies array', () => {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
        expect(Array.isArray(data.caseStudies)).toBe(true)
    })

    test('has freelanceProjects array', () => {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
        expect(Array.isArray(data.freelanceProjects)).toBe(true)
    })

    test('has recognition array', () => {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
        expect(Array.isArray(data.recognition)).toBe(true)
    })

    test('has outsideWork array', () => {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
        expect(Array.isArray(data.outsideWork)).toBe(true)
    })
})
