import { Box, Button, Flex, Text } from "@mantine/core";
import { TableCustom } from "../component/TableCustom";
import { getSplashImage } from "@/app/server/admin/splashimages";
import Link from "next/link";
import css from "./splashimages.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default async function page() {
  const data = await getSplashImage();
  console.log(`all splash`, data);
  return (
    <Box>
      <Flex justify={`space-between`}>
        <Box mb={`xl`} fw={`600`} fz={`2.5rem`}>
          Splashimages
        </Box>
        <Link href={`/admin/splashimages/add`}>
          <Button>
            Add +
            {/* <FontAwesomeIcon
              icon={faPlus}
              style={{ fontSize: `20px`, color: `white` }}
            /> */}
          </Button>
        </Link>
      </Flex>

      <TableCustom data={data}></TableCustom>
    </Box>
  );
}
