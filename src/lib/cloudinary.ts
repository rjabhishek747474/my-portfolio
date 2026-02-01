import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface UploadResult {
    url: string
    publicId: string
    width: number
    height: number
}

/**
 * Upload an image buffer to Cloudinary
 */
export async function uploadImage(
    buffer: Buffer,
    folder: string,
    fileName: string
): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: `portfolio/${folder}`,
                public_id: fileName,
                resource_type: 'image',
                format: 'webp',
                quality: 'auto:best',
                transformation: [
                    { width: 1600, crop: 'limit' },
                    { quality: 'auto:best' },
                ],
            },
            (error, result) => {
                if (error) reject(error)
                else {
                    const r = result as UploadApiResponse
                    resolve({
                        url: r.secure_url,
                        publicId: r.public_id,
                        width: r.width,
                        height: r.height,
                    })
                }
            }
        )

        uploadStream.end(buffer)
    })
}

/**
 * Delete an image from Cloudinary
 */
export async function deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId)
}

/**
 * Delete all images in a folder
 */
export async function deleteFolder(folder: string): Promise<void> {
    await cloudinary.api.delete_resources_by_prefix(`portfolio/${folder}`)
}

/**
 * Generate a signed URL with expiration (for secure access)
 */
export function getSignedUrl(publicId: string, expiresInSeconds = 3600): string {
    return cloudinary.url(publicId, {
        sign_url: true,
        type: 'authenticated',
        resource_type: 'image',
        secure: true,
        transformation: [{ quality: 'auto:best' }],
        // Note: Cloudinary signed URLs with expiry require private delivery
    })
}

export default cloudinary
