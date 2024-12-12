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
          // title={`Are you sure you want to delete this item?`}
        >
          {/* Modal content */}
          <Flex justify={`center`} direction={`column`} rowGap={10}>
            <Flex justify={`center`}>
              Are you sure you want to delete this item?
            </Flex>
            <Flex justify={`center`} gap={10}>
              <Button onClick={close} bg={`gray`}>
                No, Cancel
              </Button>
              <Button
                // mx={`auto`}
                onClick={() => {
                  handleDelete(id), close();
                }}
                bg={`red`}
              >
                Yes, Im sure
              </Button>
            </Flex>
          </Flex>
        </Modal>
      </Flex>
    </>
  );
}
