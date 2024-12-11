'use server'
import axios from "axios";
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
const baseURL = process.env.NEXT_PUBLIC_API_URL
const url = `${baseURL}/api/upload`

export async function getSplashImage () {
    // const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    // const res = await fetch(url, {method: 'GET'})
    // console.log(res)
    // return res.json();
}
export async function uploadImageS3(file:File) {
    // const formData = new FormData();
    // formData.append('file', file);
    // const res = await fetch(url,{
    //     method:'POST',
    //     body:formData
    // })
    // return res.json();

    try {
        
       
        // const datenow = new Date();
        const unixTimeZero = Date.now();
        const fileName = `uploads/${unixTimeZero}.${file.type.split("/")[1]}`;
        
        const uploadParams:any = {
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
        return fileUrl
      } catch (error) {
        console.log('Upload Error:', error);
        return;
      }
}
export async function deleteImageS3(data:any) {
  
    // const res = await fetch(url,{
    //     method:'DELETE',
    //     body:JSON.stringify(data)
    // })
    // return res.json();

    try {
        const {fileName} = await data;
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME!,
          // Bucket: `xxxx`,
          Key: fileName,
          // Body: await file.arrayBuffer(),
          // ContentType: file.type,
          // ACL:'public-read',
        };
      
        await s3Client.send(new DeleteObjectCommand(uploadParams));
        return;
      } catch (error) {
        console.log('Upload Error:', error);
        return;
      }
}
