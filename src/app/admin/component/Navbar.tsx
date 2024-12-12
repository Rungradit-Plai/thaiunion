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
  Card,
} from "@mantine/core";
export default function Navbar() {
  return (
    <Flex ta={`left`} h={`64px`} bd={"0px solid black"}>
      <Box
        // shadow="sm"
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
  );
}
