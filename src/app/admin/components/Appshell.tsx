"use client";
import {
  AppShell,
  Burger,
  Group,
  Skeleton,
  Box,
  Text,
  AppShellNavbar,
  Button,
  useMantineColorScheme,
  rem,
  useMantineTheme,
  Switch,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
// import { MantineLogo } from "@mantinex/mantine-logo";
import css from "./sidebar.module.css";
import { NavbarSegmented } from "./NavbarSegment";
import { useEffect, useState } from "react";
export default function BasicAppShell({ children }: any) {
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();
  const [themeLayer, setTheme] = useState("light");

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify={`space-between`} gap={`xl`}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* <MantineLogo size={30} /> */}
          <Box>BACKEOFFICES</Box>
          <Switch
            size="xl"
            color="dark.4"
            onLabel={sunIcon}
            offLabel={moonIcon}
            onClick={() => {
              // setTheme(themeColor == "light" ? "dark" : "light");
              setTheme((prev) => (prev == "light" ? "dark" : "light"));
              setColorScheme(themeLayer == "light" ? "dark" : "light");
            }}
          />
          {/* <FontAwesomeIcon icon={faSun} /> */}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavbarSegmented />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      {/* <AppShell.Footer bg={`black`}>test</AppShell.Footer> */}
    </AppShell>
  );
}
