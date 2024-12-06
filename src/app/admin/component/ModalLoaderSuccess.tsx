// import { Modal, Button, LoadingOverlay, Box, Flex } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// export default function ModalLoaderSuccess({ opened, close1 }: any) {
//   const [opened1, { open, close }] = useDisclosure(false);
//   return (
//     <Modal
//       mx={`xl`}
//       p={`xl`}
//       ta={`center`}
//       opened={opened}
//       withCloseButton={false}
//     >
//       <Flex align={`center`} justify={`center`} h={`250px`}>
//         {opened ? (
//           <>
//             <LoadingOverlay
//               opacity={1}
//               visible={true}
//               zIndex={1000}
//               overlayProps={{ radius: "xl", blur: 2 }}
//             />
//           </>
//         ) : (
//           <>
//             <h1>success</h1>
//           </>
//         )}
//       </Flex>
//     </Modal>
//   );
// }
