import { Box, Button } from "@mantine/core"
import SplashForm from "../components/SplashForm"
import Link from "next/link"
export default async function page() {
    return (
        <Box p={`50px`}>
            <Link href={`/admin/splashimages`}>
                <Button bg={`gray`} mb={`sm`}>
                    Back
                </Button>
            </Link>
            <SplashForm type={`add`} />
        </Box>
    )
}