import { Box ,Button,Flex, Text} from "@mantine/core";
import { TableCustom } from "../component/TableCustom"
import { getSplashImage } from "@/app/server/admin/splashimages"
import Link from "next/link";
import css from './splashimages.module.css'

export default async function page(){
    const data = await getSplashImage();

    return (
    <div>
        <Flex justify={`space-between`}>
            <Box mb={`xl`}>this splash page</Box>
            <Link href={`/admin/splashimages/add`}>
                <Button>Add +</Button>
            </Link>
        </Flex>
        <Text className={css.test}>Teretst</Text>
        <TableCustom data={data.data}></TableCustom>
    </div>)
}