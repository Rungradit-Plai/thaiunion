"use client";
import { useDisclosure } from "@mantine/hooks";
import { redirect } from "next/navigation";
import { Modal, Button, Box, Flex } from "@mantine/core";
import { deleteSplashImage } from "@/app/server/admin/splashimages";
export default function ModalDelete({ opened, open, close, id }: any) {
  async function handleDelete(id: any) {
    const result = await deleteSplashImage(id);
    redirect(`/admin/splashimages`);
  }
  return (
    <>
      <Flex
        align={`center`}
        justify={`center`}
        // style={{
        //   minHeight: `100vh`,
        // }}
      >
        <Modal
          centered
          opened={opened}
          onClose={close}
          title={`Delete id ${id}`}
        >
          {/* Modal content */}
          {/* <Box>Are u sure Delete id {id}</Box> */}
          {/* <hr /> */}
          <Flex w={`100%`} justify={`flex-end`}>
            <Button
              onClick={() => {
                handleDelete(id), close();
              }}
              bg={`red`}
            >
              Confirm
            </Button>
          </Flex>
        </Modal>
      </Flex>
    </>
  );
}
