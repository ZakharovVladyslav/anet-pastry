import fs, { writeFileSync } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
   const bodyData = await request.formData();
   const image = bodyData.get('image') as File;
   const productName = bodyData.get('productName') as string;

   if (!image) {
      return NextResponse.json({ message: 'No image provided' }, { status: 400 });
   }

   const relativePath = path.join(process.cwd(), `/public/images/${productName}`);
   // const clientPath = path.join(
   //    process.cwd(),
   //    `../client/src/public/images/${productName}`,
   // );

   let filenames: string[] = [];

   if (fs.existsSync(relativePath)) {
      filenames = fs.readdirSync(relativePath);
   } else {
      fs.mkdirSync(relativePath, { recursive: true });
   }

   const fileName = filenames.length === 0 ? 'image-1' : `image-${filenames.length + 1}`;
   const buffer = Buffer.from(await image.arrayBuffer());

   try {
      writeFileSync(`${relativePath}/${fileName}.${image.type.split('/').at(1)}`, buffer);
      return NextResponse.json({ imagesAmount: filenames.length });
   } catch {
      return NextResponse.json({ message: 'Failed to upload image' }, { status: 500 });
   }
}
