import * as fs from 'fs';
import { NextResponse } from 'next/server';
import * as path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string, name: string }> }
) {
  const p = await params;
  // Define the directory outside the project folder (adjust path as needed)
  const externalDir = path.join(process.cwd(), process.env.RELATIVE_FOLDER_PATH);
  const filePath = path.join(externalDir, p.slug, p.name);
  console.log('path', filePath)

  try {
    // Check if the file exists
    fs.accessSync(filePath);

    // Get file stats (for content length)
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    // Create a Node.js read stream
    const fileStream = fs.createReadStream(filePath);

    // Convert the Node.js stream to a web stream (essential for Next.js Route Handlers)
    const webStream = new ReadableStream({
      start(controller) {
        fileStream.on('data', (chunk) => {
          controller.enqueue(chunk);
        });
        fileStream.on('end', () => {
          controller.close();
        });
        fileStream.on('error', (err) => {
          controller.error(err);
        });
      },
      cancel() {
        fileStream.destroy();
      },
    });

    // Set response headers
    const headers = new Headers();
    headers.set('Content-Type', `video/${path.extname(p.name).substring(1)}`);
    headers.set('Content-Length', fileSize.toString());
    // Use attachment for download prompt, inline for browser playback
    // headers.set('Content-Disposition', 'attachment; filename="video.mp4"'); 

    // Return the stream using NextResponse
    return new NextResponse(webStream, {
      status: 200,
      headers,
    });

  } catch (error) {
    return new NextResponse('Image not found', { status: 404 });
  }
}