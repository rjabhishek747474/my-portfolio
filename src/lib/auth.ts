import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Admin credentials from environment variables
// Set these in .env.local or your hosting provider
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@portfolio.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-this-password'
const ADMIN_USER = {
    id: 'admin-001',
    email: ADMIN_EMAIL,
    name: process.env.ADMIN_NAME || 'Admin',
    role: 'admin',
}

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            email: string
            name: string
            role: string
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        role: string
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password required')
                }

                // Hardcoded admin authentication
                if (
                    credentials.email === ADMIN_EMAIL &&
                    credentials.password === ADMIN_PASSWORD
                ) {
                    return ADMIN_USER as User
                }

                throw new Error('Invalid credentials')
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string
                token.role = (user as User & { role: string }).role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.role = token.role
            }
            return session
        },
    },
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET || 'super-secret-key-for-portfolio-admin',
}
