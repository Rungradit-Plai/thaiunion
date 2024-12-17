"use client";
import { AppShell, Burger, Group, Skeleton, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
// import { MantineLogo } from "@mantinex/mantine-logo";

export default function BasicAppShell({ children }: any) {
  const [opened, { toggle }] = useDisclosure();
  const menu = [
    {
      image: "...",
      name: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      image: "...",
      name: "Splash image",
      link: "/admin/splashimages",
    },
  ];
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
      <AppShell.Navbar p="md">
        {/* Navbar */}
        {menu.map((row, index) => (
          <Link key={index} href={row.link} style={{ textDecoration: `none` }}>
            <Box style={{ cursor: `pointer` }} key={index} h={28} mt="sm">
              {row.name}
            </Box>
          </Link>
        ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
