import {
  AppShell,
  Box,
  Burger,
  Flex,
  Group,
  Skeleton,
  Card,
} from "@mantine/core";
// import { useDisclosure } from '@mantine/hooks';
import { Children } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
// import { MantineLogo } from '@mantinex/mantine-logo';'
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import css from "./layout.module.css";

export default function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <Flex mih={`100vh`} w={`100%`} justify={`space-between`}>
      {/* <Navbar > */}
      <Box maw={`280px`}>
        <Sidebar />
      </Box>
      <Box w={`100%`}>
        <Navbar />
        <Box p={`2rem`}>
          <Card p={`3rem`} shadow="sm" padding="lg" radius="md" withBorder>
            {/* {children} */}
          </Card>
        </Box>
      </Box>
    </Flex>
  );
}
