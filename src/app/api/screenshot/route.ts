import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/utils/cloudinary';
import streamifier from 'streamifier'
import fs from 'fs';
import path, { resolve } from 'path';

const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const responseData = await req.json()
        const { screenshot } = responseData
        // Get the base64 data of the screenshot sent from the client
        const base64Data = screenshot;
        const filename = `image-${Date.now()}`

        // Remove the data URI header to extract the actual image data
        const imageBuffer = Buffer.from(base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''), 'base64');

        // Upload the image to Cloudinary

        const uploadToCloudinary = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'previews' }, (error, response) => {
                    if (error) {
                        console.error('Error uploading screenshot:', error);
                        reject(error)
                    } else {
                        console.log('Image uploaded to Cloudinary:', response);
                        resolve(response?.secure_url)
                    }
                }
                )
                streamifier.createReadStream(imageBuffer).pipe(stream);
            })
        }
        // Upload the image to Cloudinary and get the secure URL
        const secureUrl = await uploadToCloudinary()
        console.log(secureUrl)
        return NextResponse.json(secureUrl);

    } catch (error) {
        console.error('Error saving screenshot:', error);
        return NextResponse.json({ err: 'Error saving screenshot', error });
    }
}

export { POST }