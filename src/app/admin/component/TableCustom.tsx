
"use client"
import { Table, Progress, Anchor, Text, Group, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getSplashImage } from '@/app/server/admin/splashimages';
import Link from 'next/link';
import ModalDelete from '../splashimages/components/ModalDelete';
import { useDisclosure } from '@mantine/hooks';
// import classes from './TableReviews.module.css';


export function TableCustom({data}) {
    const [opened, { open, close }] = useDisclosure(false);
    // console.log('props',data)
    const [selectedId,setId] = useState();
    const [isOpen,setOpen] = useState(false)
    // const [data,setData] = useState([]);
    async function handleDelete(id){
        setId(id)
        setOpen(true)
        open
    }
    const rows = data.map((row,index) => {
    // const totalReviews = row.reviews.negative + row.reviews.positive;
    // const positiveReviews = (row.reviews.positive / totalReviews) * 100;
    // const negativeReviews = (row.reviews.negative / totalReviews) * 100;
    let start_date = new Date(Date.parse(row.start_date));
    let end_date = new Date(Date.parse(row.end_date));
    // console.log(data);
    // return
    return (
      <Table.Tr key={index}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{row.name} </Table.Td>
        <Table.Td>{row.description}</Table.Td>
        <Table.Td>{start_date ? start_date.toLocaleDateString() : 'Date not available'}</Table.Td>
        <Table.Td>{end_date ? end_date.toLocaleDateString() : 'Date not available'}</Table.Td>
        <Table.Td>

          <img src={row.image_path} width={`80px`} height={`60px`} alt="" /> 
        </Table.Td>
    

        <Table.Td><Link href={`/admin/splashimages/${row.id}`}><Button>Edit</Button></Link></Table.Td>
        <Table.Td><Button  onClick={(e)=>{
            open();
            handleDelete(row.id)
        }} bg={`red`}>Delete</Button></Table.Td>
        
       
      </Table.Tr>
    );
  });

  return (
    <>
         <Table.ScrollContainer minWidth={800}>
        <Table striped highlightOnHover verticalSpacing="xs">
            <Table.Thead>
            <Table.Tr>
                <Table.Th>No.</Table.Th>
                <Table.Th>name</Table.Th>
                <Table.Th>description</Table.Th>
                <Table.Th>start date</Table.Th>
                <Table.Th>end date</Table.Th>
                <Table.Th>image</Table.Th>
                {/* <Table.Th>Reviews</Table.Th>
                <Table.Th>Reviews distribution</Table.Th> */}
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        </Table.ScrollContainer>
        <ModalDelete opened={opened} open={isOpen} close={close} id={selectedId} />
    </>
  );
}