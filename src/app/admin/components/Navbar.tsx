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
      <Card
        // shadow="sm"
        w={`100%`}
        fz={`1.5rem`}
        fw={`600`}
        flex={`flex`}
        ta={`left`}
        py={`20px`}
        px={`20px`}
        shadow="xs"
      >
        Back Office
      </Card>
    </Flex>
  );
}
