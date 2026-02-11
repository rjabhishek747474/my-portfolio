import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import fs from 'fs/promises'
import path from 'path'

// Path to the JSON data file
const dataFilePath = path.join(process.cwd(), 'src/data/portfolio.json')

// GET /api/portfolio - Get portfolio data (public)
export async function GET() {
    try {
        // Read data directly from the file system
        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        const data = JSON.parse(fileContents)

        return NextResponse.json(data)
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

        // Read existing data first to ensure we merge correctly
        // (though arguably we could just overwrite if the frontend sends the whole state, 
        // but merging is safer if the frontend sends partial updates)
        let currentData = {}
        try {
            const fileContents = await fs.readFile(dataFilePath, 'utf8')
            currentData = JSON.parse(fileContents)
        } catch (readError) {
            console.warn('Could not read existing data file, starting with empty object', readError)
        }

        // Merge new data with existing data
        const updatedData = { ...currentData, ...body }

        // Write updated data back to the file
        await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 4), 'utf8')

        return NextResponse.json({
            success: true,
            message: 'Portfolio updated! Changes saved to disk.'
        })
    } catch (error) {
        console.error('Error updating portfolio data:', error)
        return NextResponse.json(
            { error: 'Failed to update portfolio data' },
            { status: 500 }
        )
    }
}
