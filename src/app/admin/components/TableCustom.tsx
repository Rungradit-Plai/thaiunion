"use client";
import {
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  Button,
  Flex,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getSplashImage } from "@/app/server/admin/splashimages";
import Link from "next/link";
import ModalDelete from "../splashimages/components/ModalDelete";
import { useDisclosure } from "@mantine/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
// import classes from './TableReviews.module.css';

export function TableCustom({ data }: any) {
  const [opened, { open, close }] = useDisclosure(false);
  // console.log('props',data)
  const [selectedId, setId] = useState();
  const [isOpen, setOpen] = useState(false);
  // const [data,setData] = useState([]);
  async function handleDelete(id: any) {
    setId(id);
    setOpen(true);
    open;
  }
  const rows = data.map((row: any, index: number) => {
    let start_date = new Date(Date.parse(row.start_date));
    let end_date = new Date(Date.parse(row.end_date));
    return (
      <Table.Tr key={index}>
        <Table.Td ta={`center`}>{index + 1}</Table.Td>
        <Table.Td>{row.name} </Table.Td>
        <Table.Td>{row.description}</Table.Td>
        <Table.Td>
          {start_date ? start_date.toLocaleDateString() : "Date not available"}
        </Table.Td>
        <Table.Td>
          {end_date ? end_date.toLocaleDateString() : "Date not available"}
        </Table.Td>
        <Table.Td>
          <img src={row.image_path} width={`80px`} height={`60px`} alt="" /> 
        </Table.Td>

        <Table.Td>
          <Flex style={{ gap: `1rem` }} ta={"center"} align={`center`}>
            <Link href={`/admin/splashimages/${row.id}`}>
              {/* <Button>Edit</Button> */}
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "black", fontSize: `24px` }}
              />
            </Link>
            <FontAwesomeIcon
              onClick={(e) => {
                open();
                handleDelete(row.id);
              }}
              icon={faTrashCan}
              style={{ fontSize: `24px`, cursor: `pointer` }}
              // className="hover:bg-red-500"
            />
          </Flex>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <Table.ScrollContainer
        // bd={`0.3px solid`}
        p={`3rem`}
        minWidth={800}
        style={{
          borderRadius: "0.5rem",
        }}
      >
        <Table striped highlightOnHover verticalSpacing="lg">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>No.</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Start date</Table.Th>
              <Table.Th>End date</Table.Th>
              <Table.Th>Image</Table.Th>
              {/* <Table.Th>Reviews</Table.Th>
                <Table.Th>Reviews distribution</Table.Th> */}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <ModalDelete
        opened={opened}
        open={isOpen}
        close={close}
        id={selectedId}
      />
    </>
  );
}
