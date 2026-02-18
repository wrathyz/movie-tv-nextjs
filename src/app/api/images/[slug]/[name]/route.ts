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

  try {
    const stat = await fs.promises.stat(filePath);
    const imageBuffer = await fs.promises.readFile(filePath);

    return new NextResponse(imageBuffer as any, {
      headers: {
        'Content-Type': `image/${path.extname(p.name).substring(1)}`, // Dynamically set content type
        'Content-Length': stat.size.toString(),
      },
    });
  } catch (error) {
    return new NextResponse('Image not found', { status: 404 });
  }
}