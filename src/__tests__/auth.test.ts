/**
 * Authentication Tests
 * Tests for the auth configuration
 */

import { authOptions } from '@/lib/auth'

describe('Auth Configuration', () => {
    test('authOptions is defined', () => {
        expect(authOptions).toBeDefined()
    })

    test('has credentials provider configured', () => {
        expect(authOptions.providers).toBeDefined()
        expect(authOptions.providers.length).toBeGreaterThan(0)
    })

    test('has correct sign in page configured', () => {
        expect(authOptions.pages?.signIn).toBe('/admin/login')
    })

    test('has JWT session strategy', () => {
        expect(authOptions.session?.strategy).toBe('jwt')
    })

    test('has secret configured', () => {
        expect(authOptions.secret).toBeDefined()
        expect(typeof authOptions.secret).toBe('string')
    })

    test('has callbacks configured', () => {
        expect(authOptions.callbacks).toBeDefined()
        expect(authOptions.callbacks?.jwt).toBeDefined()
        expect(authOptions.callbacks?.session).toBeDefined()
    })

    test('session maxAge is 24 hours', () => {
        expect(authOptions.session?.maxAge).toBe(24 * 60 * 60)
    })
})

describe('Auth Provider', () => {
    test('credentials provider has email field', () => {
        const provider = authOptions.providers[0] as any
        expect(provider.options?.credentials?.email).toBeDefined()
    })

    test('credentials provider has password field', () => {
        const provider = authOptions.providers[0] as any
        expect(provider.options?.credentials?.password).toBeDefined()
    })
})
