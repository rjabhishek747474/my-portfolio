import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'src/data/portfolio.json')

// GET /api/portfolio - Get portfolio data (public)
export async function GET() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8')
        return NextResponse.json(JSON.parse(data))
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

        // Write to file
        fs.writeFileSync(DATA_FILE, JSON.stringify(body, null, 2), 'utf-8')

        return NextResponse.json({ success: true, message: 'Portfolio updated!' })
    } catch (error) {
        console.error('Error updating portfolio data:', error)
        return NextResponse.json(
            { error: 'Failed to update portfolio data' },
            { status: 500 }
        )
    }
}
