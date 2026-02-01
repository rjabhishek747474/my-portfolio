import { fromBuffer } from 'pdf2pic'
import sharp from 'sharp'

export interface RenderedPage {
    pageNumber: number
    buffer: Buffer
    width: number
    height: number
}

/**
 * Convert PDF buffer to images (PNG format)
 * Returns array of page images as buffers
 */
export async function renderPdfToImages(
    pdfBuffer: Buffer,
    options: {
        pages?: number[] | 'all' | 'first'
        width?: number
        density?: number
    } = {}
): Promise<RenderedPage[]> {
    const {
        pages = 'first',
        width = 1600,
        density = 150,
    } = options

    const converter = fromBuffer(pdfBuffer, {
        density,
        saveFilename: 'page',
        savePath: './temp',
        format: 'png',
        width,
        preserveAspectRatio: true,
    })

    const results: RenderedPage[] = []

    if (pages === 'first') {
        // Render only first page
        const result = await converter(1, { responseType: 'buffer' })
        if (result.buffer) {
            // Optimize with sharp
            const optimized = await sharp(result.buffer)
                .webp({ quality: 90 })
                .toBuffer()

            const metadata = await sharp(result.buffer).metadata()

            results.push({
                pageNumber: 1,
                buffer: optimized,
                width: metadata.width || width,
                height: metadata.height || Math.round(width * 1.414), // A4 aspect
            })
        }
    } else if (pages === 'all') {
        // Render all pages (use bulk conversion)
        const bulkResults = await converter.bulk(-1, { responseType: 'buffer' })

        for (let i = 0; i < bulkResults.length; i++) {
            const result = bulkResults[i]
            if (result.buffer) {
                const optimized = await sharp(result.buffer)
                    .webp({ quality: 90 })
                    .toBuffer()

                const metadata = await sharp(result.buffer).metadata()

                results.push({
                    pageNumber: i + 1,
                    buffer: optimized,
                    width: metadata.width || width,
                    height: metadata.height || Math.round(width * 1.414),
                })
            }
        }
    } else if (Array.isArray(pages)) {
        // Render specific pages
        for (const pageNum of pages) {
            const result = await converter(pageNum, { responseType: 'buffer' })
            if (result.buffer) {
                const optimized = await sharp(result.buffer)
                    .webp({ quality: 90 })
                    .toBuffer()

                const metadata = await sharp(result.buffer).metadata()

                results.push({
                    pageNumber: pageNum,
                    buffer: optimized,
                    width: metadata.width || width,
                    height: metadata.height || Math.round(width * 1.414),
                })
            }
        }
    }

    return results
}

/**
 * Get PDF page count without rendering
 */
export async function getPdfPageCount(pdfBuffer: Buffer): Promise<number> {
    const converter = fromBuffer(pdfBuffer, {
        density: 72,
        saveFilename: 'count',
        savePath: './temp',
        format: 'png',
        width: 100,
    })

    try {
        const results = await converter.bulk(-1, { responseType: 'buffer' })
        return results.length
    } catch {
        return 1
    }
}

/**
 * Add watermark overlay to image
 */
export async function addWatermark(
    imageBuffer: Buffer,
    text: string
): Promise<Buffer> {
    const image = sharp(imageBuffer)
    const metadata = await image.metadata()
    const width = metadata.width || 1600
    const height = metadata.height || 2000

    // Create SVG watermark
    const watermarkSvg = `
    <svg width="${width}" height="${height}">
      <style>
        .watermark {
          fill: rgba(255, 255, 255, 0.08);
          font-family: Arial, sans-serif;
          font-size: 48px;
          font-weight: bold;
        }
      </style>
      <text 
        x="50%" 
        y="50%" 
        text-anchor="middle" 
        transform="rotate(-45, ${width / 2}, ${height / 2})"
        class="watermark"
      >${text}</text>
    </svg>
  `

    return image
        .composite([
            {
                input: Buffer.from(watermarkSvg),
                top: 0,
                left: 0,
            },
        ])
        .webp({ quality: 90 })
        .toBuffer()
}
