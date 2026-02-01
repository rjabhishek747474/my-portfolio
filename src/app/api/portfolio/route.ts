import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { portfolioData } from '@/data/portfolio'

// In-memory storage for runtime updates (resets on cold start)
let runtimeData = { ...portfolioData }

// GET /api/portfolio - Get portfolio data (public)
export async function GET() {
    try {
        return NextResponse.json(runtimeData)
    } catch (error) {
        console.error('Error reading portfolio data:', error)
        return NextResponse.json(
            { error: 'Failed to read portfolio data' },
            { status: 500 }
        )
    }
}

// PUT /api/portfolio - Update portfolio data (admin only)
export async function PUT(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()

        // Update in-memory data
        runtimeData = { ...runtimeData, ...body }

        return NextResponse.json({
            success: true,
            message: 'Portfolio updated! Note: Changes persist until next deployment.'
        })
    } catch (error) {
        console.error('Error updating portfolio data:', error)
        return NextResponse.json(
            { error: 'Failed to update portfolio data' },
            { status: 500 }
        )
    }
}
