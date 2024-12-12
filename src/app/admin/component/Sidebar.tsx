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
import css from "./sidebar.module.css";
export default function Sidebar() {
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
    <Box h={`100%`}>
      <Flex flex={1} direction={`row`} h={`100%`}>
        <Box
          bd={`1px solid black`}
          //   bg={`#ffff`}
          bg={`#001529`}
          miw={`280px`}
          // h={`100vh`}
          ta={`left`}
        >
          <Box ta={`center`} fz={`h1`} c={`#ffff`}>
            LOGO
          </Box>
          <List fw={`bold`}>
            {menu.map((row: any, index: number) => (
              <Link key={index} href={row.link} style={{ color: "black" }}>
                <List.Item
                  key={index}
                  my={`xs`}
                  p={`xs`}
                  mx={`xs`}
                  // ml={'xs'}
                  c={activeIndex == index ? `white` : "white"}
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
      </Flex>
    </Box>
  );
}
