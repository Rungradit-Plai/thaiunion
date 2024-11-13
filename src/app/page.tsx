import Image from "next/image";
import styles from "./page.module.css";
import { Box, Flex } from "@mantine/core";
import FormLogin from "./components/FormLogin";
export default function Home() {

  return (
      <Flex  direction={`row`} style={{
        minHeight:`100vh`
      }}>
        <Flex justify={`center`} align={`center`} w={`50%`}>
          <FormLogin></FormLogin>
        </Flex>
        <Box w={`50%`} bg={`black`}>t</Box>
      </Flex>
  );
}
