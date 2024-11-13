import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';
import { request } from 'http';
type ResponseData = {
  message: string
}
const prisma = new PrismaClient();
 

export async function DELETE(request: Request,{params}){
    const {slug} = params;
    try{
        if(request.method == 'DELETE'){
        //   const {name,description,start_date,end_date} = await request.json();
          // console.log('this request',request);
          const result = await prisma.backoffice_splash_page.delete({
            where:{
                id:parseInt(slug)
            }
          });
          return Response.json({
            status: 200,
            message: 'Success',
            data:slug
          });
        }
      }catch(error){
        return Response.json(
          {
            statua:500,
            message:'Internal server error',
            data:slug
          }
        );
    
      }
}

export async function GET(request: Request,{params}){
    try{
        const {slug} = params;
        if(request.method == 'GET'){

          const result = await prisma.backoffice_splash_page.findUnique({
            where:{
                id:parseInt(slug)
            }
          }) ?? [];
          return Response.json({
            status: 200,
            message: 'Success',
            data:result
          });
        }
      }catch(error){
        return Response.json(
          {
            statua:500,
            message:'Internal server error',
            // data:slug
          }
        );
    
      }
}
export async function PATCH(request: Request,{params}){
    
    const {slug} = params;
  
    try{
        if(request.method == 'PATCH'){
        const {name,description,start_date,end_date,image_path} = await request.json();

          const result = await prisma.backoffice_splash_page.update({
            where:{
                id:parseInt(slug)
            },
            data:{
                name,
                description,
                start_date,
                end_date,
                image_path
            }
          }) ?? [];
          return Response.json({
            status: 200,
            message: 'Success',
            data:result
          });
        }
      }catch(error){
        return Response.json(
          {
            statua:500,
            message:'Internal server error',
            // data:slug
          }
        );
    
      }
}
