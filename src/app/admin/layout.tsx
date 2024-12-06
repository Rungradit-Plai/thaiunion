import { AppShell, Box, Burger, Flex, Group, Skeleton } from "@mantine/core";
// import { useDisclosure } from '@mantine/hooks';
import { Children } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
// import { MantineLogo } from '@mantinex/mantine-logo';'
import Navbar from "./component/Navbar";
import css from "./layout.module.css";

export default function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar>{children}</Navbar>
    </>
  );
}
