import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';
import { request } from 'http';
type ResponseData = {
  message: string
}
const prisma = new PrismaClient();
 
export async function GET(request: Request) {
  if(request.method == 'GET'){
    const allsplash = await prisma.backoffice_splash_page.findMany({
      orderBy:[{
        id:`asc`
      }]
    });
    return Response.json({
      status: 200,
      message: 'Success',
      data: allsplash,
    });
  }
  
}

export async function POST(request: Request){
  try{
    if(request.method == 'POST'){
      const {name,description,start_date,end_date,image_path} = await request.json();
      // console.log('this request',request);
      const result = await prisma.backoffice_splash_page.create({
        data:{
        uuid:uuidv4(),
        name,
        description,
        start_date,
        end_date,
        image_path
        }
      });
      return Response.json({
        status: 200,
        message: 'Success',
        data:name
      });
    }
  }catch(error){
    return Response.json(
      {
        statua:500,
        message:'Internal server error',
        data:request
      }
    )

  }
  
}

