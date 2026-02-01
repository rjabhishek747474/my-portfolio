import { google } from 'googleapis'
import { Readable } from 'stream'

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
})

const drive = google.drive({ version: 'v3', auth })

export interface DriveFileInfo {
    id: string
    name: string
    mimeType: string
    size: number
}

/**
 * Get file metadata from Google Drive
 */
export async function getFileInfo(fileId: string): Promise<DriveFileInfo> {
    const response = await drive.files.get({
        fileId,
        fields: 'id, name, mimeType, size',
    })

    return {
        id: response.data.id || fileId,
        name: response.data.name || 'Unknown',
        mimeType: response.data.mimeType || 'application/pdf',
        size: parseInt(response.data.size || '0', 10),
    }
}

/**
 * Download file content as buffer from Google Drive
 */
export async function downloadFile(fileId: string): Promise<Buffer> {
    const response = await drive.files.get(
        { fileId, alt: 'media' },
        { responseType: 'stream' }
    )

    const stream = response.data as Readable
    const chunks: Buffer[] = []

    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
        stream.on('error', (err) => reject(err))
        stream.on('end', () => resolve(Buffer.concat(chunks)))
    })
}

/**
 * Extract file ID from various Google Drive URL formats
 */
export function extractFileId(input: string): string {
    // Already a file ID (alphanumeric with dashes/underscores)
    if (/^[\w-]{20,}$/.test(input)) {
        return input
    }

    // Google Drive URL patterns
    const patterns = [
        /\/file\/d\/([^/]+)/,           // /file/d/{id}/
        /id=([^&]+)/,                    // ?id={id}
        /\/d\/([^/]+)/,                  // /d/{id}/
        /\/open\?id=([^&]+)/,           // /open?id={id}
    ]

    for (const pattern of patterns) {
        const match = input.match(pattern)
        if (match) return match[1]
    }

    throw new Error('Invalid Google Drive URL or file ID')
}
