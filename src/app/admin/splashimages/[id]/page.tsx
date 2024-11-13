import { Box, Button } from "@mantine/core"
import Link from "next/link"
import SplashForm from "../components/SplashForm"
import { getSplashImageById } from "@/app/server/admin/splashimages"
export default async function Page({
    params,
    searchParams,
  }: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
    const {id} = (await params)
 
    const result =  await getSplashImageById(id);

    // console.log(data)
    return (
      <Box>
        <Link href={`/admin/splashimages`}>
          <Button bg={"#c8cad3"}>Back</Button>
        </Link>
        <h1>Edit splashimages</h1>
        <SplashForm type={`update`} data={result.data} id={id} />
      </Box>
    
    )
  }