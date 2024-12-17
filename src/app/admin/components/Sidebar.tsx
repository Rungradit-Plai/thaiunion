"use client";
import { Group, List, Button, Box, Paper, Flex, Card } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { trackSynchronousRequestDataAccessInDev } from "next/dist/server/app-render/dynamic-rendering";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHippo } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
// import { MantineLogo } from '@mantinex/mantine-logo';
import css from "./sidebar.module.css";
export default function Sidebar() {
  const [activeIndex, setActive] = useState<number>(0);
  const menu = [
    // {
    //   image: "...",
    //   name: "Dashboard",
    //   link: "/admin/dashboard",
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
        <Card
          miw={`280px`}
          ta={`left`}
          style={{
            borderRight:
              "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
          }}
        >
          <Group justify={`center`} fz={`h1`} c={`#ffff`} gap={5}>
            <Box>Logo</Box>
          </Group>
          <List fw={`bold`}>
            {menu.map((row: any, index: number) => (
              <Link key={index} href={row.link} style={{ color: "black" }}>
                <List.Item
                  key={index}
                  my={`xs`}
                  p={`xs`}
                  mx={`xs`}
                  fw={`lighter`}
                  // c={activeIndex == index ? `#228be6` : "white"}
                  // bg={activeIndex == index ? `blue` : ""}
                  style={{
                    listStyle: `none`,
                    cursor: `pointer`,
                    borderRadius: `5px`,
                    // fontWeight: `lighter`,
                  }}
                  className={css.list}
                  onClick={() => {
                    handleclicked(index);
                  }}
                >
                  {row.name}
                </List.Item>
              </Link>
            ))}
          </List>
        </Card>
      </Flex>
    </Box>
  );
}
