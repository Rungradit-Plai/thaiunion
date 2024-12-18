"use client";
import {
  AppShell,
  Burger,
  Group,
  Skeleton,
  Box,
  Text,
  AppShellNavbar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
// import { MantineLogo } from "@mantinex/mantine-logo";
import css from "./sidebar.module.css";
import { NavbarSegmented } from "./NavbarSegment";
export default function BasicAppShell({ children }: any) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* <MantineLogo size={30} /> */}
          Backoffice
        </Group>
      </AppShell.Header>
      <AppShellNavbar>
        <NavbarSegmented />
      </AppShellNavbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
