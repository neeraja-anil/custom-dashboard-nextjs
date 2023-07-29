import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const responseData = await req.json()
        const { screenshot } = responseData
        // Get the base64 data of the screenshot sent from the client
        const base64Data = screenshot;
        const filename = `image-${Date.now()}`

        // Remove the data URI header to extract the actual image data
        const imageBuffer = Buffer.from(base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''), 'base64');

        // Save the image to the public/images folder
        const imagePath = path.join(process.cwd(), 'public', 'images', `${filename}.jpg`)
        fs.writeFileSync(imagePath, imageBuffer);

        console.log(imagePath)

        return NextResponse.json(imagePath);
    } catch (error) {
        console.error('Error saving screenshot:', error);
        return NextResponse.json({ error: 'Error saving screenshot' });
    }
}

export { POST }