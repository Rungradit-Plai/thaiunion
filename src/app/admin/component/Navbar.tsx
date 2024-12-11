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
    <Box>
      <Flex>
        <Box
          fz={`1.5rem`}
          fw={`600`}
          flex={`flex`}
          ta={`center`}
          py={`20px`}
          px={`20px`}
        >
          Back Office
        </Box>
      </Flex>
      <Flex direction={`row`} bg={`#f5f5f5`} mih={"100vh"} h={`100%`}>
        <Box
          bd={`1px`}
          bg={`#ffff`}
          miw={`280px`}
          ta={`left`}
          style={{
            position: `sticky`,
          }}
        >
          <List fw={`bold`}>
            {menu.map((row: any, index: number) => (
              <Link key={index} href={row.link} style={{ color: "black" }}>
                <List.Item
                  key={index}
                  my={`xs`}
                  p={`xs`}
                  mx={`xs`}
                  // ml={'xs'}
                  c={activeIndex == index ? `#0080FF` : "black"}
                  bg={activeIndex == index ? `transparent` : ""}
                  style={{
                    listStyle: `none`,
                    cursor: `pointer`,

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
        </Box>
        <Box
          w={`100%`}
          m={`2em`}
          p={`3rem`}
          //   bd={`1px solid`}
          h={`fit-content`}
          bg={"#ffff"}
          style={{ borderRadius: "0.5rem" }}
        >
          <Box>{children}</Box>
        </Box>
      </Flex>
    </Box>
  );
}
