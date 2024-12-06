import { Box, Button } from "@mantine/core";
import SplashForm from "../components/SplashForm";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default async function page() {
  return (
    <Box p={`50px`}>
      <Link href={`/admin/splashimages`}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ fontSize: `24px`, color: "black", cursor: `pointer` }}
        />
      </Link>
      <h1>Create new splash image</h1>
      <SplashForm type={`add`} />
    </Box>
  );
}
