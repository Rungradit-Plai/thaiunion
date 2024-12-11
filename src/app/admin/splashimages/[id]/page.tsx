import { Box, Button } from "@mantine/core";
import Link from "next/link";
import SplashForm from "../components/SplashForm";
import { getSplashImageById } from "@/app/server/admin/splashimages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { PrismaClient } from "@prisma/client";
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id }: any = await params;

  const result = await getSplashImageById(id);

  console.log(`all result`, result);
  return (
    <Box>
      <Link href={`/admin/splashimages`}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ fontSize: `24px`, color: "black", cursor: `pointer` }}
        />
      </Link>
      <h1>Edit splashimages</h1>
      <SplashForm type={`update`} data={result} id={id} />
    </Box>
  );
}
