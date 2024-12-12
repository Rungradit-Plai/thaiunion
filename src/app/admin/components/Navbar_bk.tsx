"use client";
import {
  AppShell,
  Burger,
  Group,
  List,
  Button,
  Box,
  Paper,
  Flex,
} from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { trackSynchronousRequestDataAccessInDev } from "next/dist/server/app-render/dynamic-rendering";
import Link from "next/link";
import { useState } from "react";
// import { MantineLogo } from '@mantinex/mantine-logo';
import css from "../layout.module.css";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const { hovered, ref } = useHover();
  const [activeIndex, setActive] = useState<any>("");
  const menu = [
    // {
    //     image:"...",
    //     name:"Dashboard",
    //     link:"/admin/dashboard",
    // },
    {
      image: "...",
      name: "Splash image",
      link: "/admin/splashimages",
    },
  ];
  const handleclicked = (index: number) => {
    setActive(index);
  };
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <Flex>
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            {/* <MantineLogo size={30} /> */}
            header
          </Group>
        </AppShell.Header>
      </Flex>

      <Flex w={`100%`}>
        <AppShell.Navbar p="md">
          {/* Navbar */}
          <List c={`#f5f5f5`} fw={`bold`}>
            {menu.map((row: any, index: number) => (
              <Link key={index} href={row.link}>
                <List.Item
                  key={index}
                  // className={activeIndex == index ? 'active':''}
                  my={`xs`}
                  p={`xs`}
                  // ml={'xs'}
                  c={activeIndex == index ? `#007bff` : ""}
                  // bg={activeIndex == index ?`#007bff`:''}

                  // ta={`center`}
                  style={{
                    listStyle: `none`,
                    cursor: `pointer`,
                    // backgroundColor: activeIndex == index ? `#007bff` : '',
                    borderRadius: `5px`,
                  }}
                  onClick={() => {
                    handleclicked(index);
                  }}
                >
                  {row.name}
                </List.Item>
              </Link>
            ))}
          </List>
        </AppShell.Navbar>
        <AppShell.Main
          style={{
            backgroundColor: "#f5f5f5",
          }}
        >
          <Paper
            shadow="md"
            radius="lg"
            p={`xl`}
            style={{
              minHeight: "50vh",
            }}
          >
            {children}
          </Paper>
        </AppShell.Main>
      </Flex>
    </AppShell>
  );
}
