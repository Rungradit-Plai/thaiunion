'use server'
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

const baseURL = process.env.NEXT_PUBLIC_API_URL
const url = `${baseURL}/api/splashimages`
const prisma = new PrismaClient()


export async function getSplashImage () {

    const allsplash = await prisma.backoffice_splash_page.findMany({
        orderBy:[{
          id:`asc`
        }]
    });
    return allsplash;
}
export async function addSplashImage(data:any) {
    // const res = await fetch(url,{
    //     method:'POST',
    //     body:JSON.stringify(data)
    // })
    // return res.json();
    try{
        const {name,description,start_date,end_date,image_path} = await data;
        const result = await prisma.backoffice_splash_page.create({
            data:{
                uuid:v4(),
                name,
                description,
                start_date,
                end_date,
                image_path,
                created_at:new Date(),
            }
        });
        return result;
    }catch(error){
        console.log(error)
        return;
    }
    // return result;
}
export async function deleteSplashImage(id:string) {
    // const res = await fetch(`${url}/${id}`,{
    //     method:'DELETE'
    // })
    // return res.json();
    try {
        const result = await prisma.backoffice_splash_page.delete({
            where:{
                id:parseInt(id)
            }
        }); 
        return result
    } catch (error) {
        console.log(error)
        return;
    } 
}
export async function getSplashImageById(id:string) {
    // const res = await fetch(`${url}/${id}`,{
    //     method:'GET'
    // })
    // return res.json(); 
    try {
        const result = await prisma.backoffice_splash_page.findUnique({
            where:{
                id:parseInt(id)
            }
          }) ?? []; 
          return result;
    } catch (error) {
            console.log(error)
            return;
    }
    

}
export async function updateSplashImageById(id:string,data:any) {
    // const res = await fetch(`${url}/${id}`,{
    //     method:'PATCH',
    //     body:JSON.stringify(data)
    // })
    // return res.json(); 
    try {
        const {name,description,start_date,end_date,image_path} = await data;
      

        const result = await prisma.backoffice_splash_page.update({
          where:{
              id:parseInt(id)
          },
          data:{
              name,
              description,
              start_date,
              end_date,
              image_path,
              updated_at:new Date()
          }
        }) ?? [];
        return result;
    } catch (error) {
        console.log(error)
        return;
    }
}