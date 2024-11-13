import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, PutBucketAclCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  endpoint:'https://sgp1.digitaloceanspaces.com',
  // region: process.env.AWS_REGION,
  // forcePathStyle:false,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    const unixTimeZero = Date.parse(new Date());
    const fileName = `uploads/${unixTimeZero}.${file.type.split("/")[1]}`;
    
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      // Bucket: `xxxx`,
      Key: fileName,
      Body: await file.arrayBuffer(),
      ContentType: file.type,
      ACL:'public-read',
    };
    // return NextResponse.json({body:uploadParams.Body})
    await s3Client.send(new PutObjectCommand(uploadParams));
    // await s3Client.send(new PutObjectCommand(uploadParams));
    // return NextResponse.json({test:uploadParams.Bucket});
    const fileUrl = `https://thaiunion.sgp1.digitaloceanspaces.com/${fileName}`;
    // const fileUrl = `https://thaiunion.sgp1.digitaloceanspaces.com`;
    return NextResponse.json({
      status:200,
      message:`success`,
      data : {
        fileName : fileUrl
      }
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error}, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  
  try {
    const {fileName} = await req.json();
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      // Bucket: `xxxx`,
      Key: fileName,
      // Body: await file.arrayBuffer(),
      // ContentType: file.type,
      // ACL:'public-read',
    };
  
    await s3Client.send(new DeleteObjectCommand(uploadParams));
    return NextResponse.json({
      status:200,
      message:`success`,
      data : {}
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error}, { status: 500 });
  }
}
