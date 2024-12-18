import { Box, Button, Flex, Text } from "@mantine/core";
import { TableCustom } from "../components/TableCustom";
import { getSplashImage } from "@/app/server/admin/splashimages";
import Link from "next/link";
import css from "./splashimages.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { headers } from "next/headers";

export default async function page() {
  const data = await getSplashImage();

  return (
    <Box w={`100%`}>
      <Flex justify={`space-between`}>
        <Box mb={`xl`} fw={`600`} fz={`2.5rem`}>
          Splashimages
        </Box>
        <Link href={`/admin/splashimages/add`}>
          <Button>Add +</Button>
        </Link>
      </Flex>

      <TableCustom data={data} />
    </Box>
  );
}
