"use client";
import {
  Button,
  Checkbox,
  Group,
  TextInput,
  Grid,
  FileInput,
  Box,
  Flex,
  Loader,
  Input,
  Text,
  rem,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "@mantine/dates/styles.css";
import {
  addSplashImage,
  updateSplashImageById,
} from "@/app/server/admin/splashimages";
import ModalDelete from "./ModalDelete";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getSplashImageById } from "@/app/server/admin/splashimages";
import { uploadImageS3, deleteImageS3 } from "@/app/server/admin/upload";
import css from "./splashForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { DatePickerInput } from "@mantine/dates";

export default function SplashForm({ type, data, id }: any) {
  const [isOpen, setOpen] = useState(false);
  // const [list,setList] = useState({});
  const [file, setFile] = useState(data?.image_path);
  const [value, setValue] = useState<any>([
    data?.start_date ? new Date(Date.parse(data.start_date)) : null,
    data?.end_date ? new Date(Date.parse(data.end_date)) : null,
  ]);
  const [isOpenDate, setDateRangeOpen] = useState<boolean>(false);
  const [isLoad, setLoading] = useState<boolean>(false);
  // console.log('test',data)
  const Form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: data ? data.name : "",
      description: data ? data.description : "",
      start_date: data ? new Date(Date.parse(data.start_date)) : "",
      end_date: data ? new Date(Date.parse(data.end_date)) : "",
      image_path: data ? data.image_path : "",
    },
    validate: {
      name: (value) =>
        value.length < 2 ? `Name must have at least 2 letters` : null,
      description: (value) =>
        value.length < 2 ? `description must have at least 2 letters` : null,
    },
  });
  async function addSplashImages(val: any) {
    val = {
      ...val,
      image_path: file,
      start_date: value[0]?.toLocaleString()
        ? new Date(value[0]?.toLocaleString())
        : null,
      end_date: value[1]?.toLocaleString()
        ? new Date(value[1]?.toLocaleString())
        : null,
    };
    setOpen(true);
    const result = await addSplashImage(val);
    console.log("add", result);
    // if (result.status == 200) {
    //   setTimeout(() => {
    //     setOpen(false);
    //   }, 3000);
    // }
    redirect(`/admin/splashimages`);
  }
  async function updateSplashImages(val: any) {
    // console.log(value[0]?.toLocaleString());
    // return;
    val = {
      ...val,
      image_path: file,
      start_date: value[0]?.toLocaleString()
        ? new Date(value[0]?.toLocaleString())
        : null,
      end_date: value[1]?.toLocaleString()
        ? new Date(value[1]?.toLocaleString())
        : null,
    };
    setOpen(true);
    const result = await updateSplashImageById(id, val);
    redirect(`/admin/splashimages`);
  }

  const handleImageUpload = async (event: any) => {
    try {
      await handleDeleteImage();
      setFile(null);
      const file = event?.[0];
      setLoading(true);
      const result = await uploadImageS3(file);
      console.log("result image", result);
      // if (result.status == 200) {

      setFile(result || null);
      setLoading(false);
      // }
    } catch (error) {
      // alert(error);
      return;
    }
  };

  const handleDeleteImage = async () => {
    // alert(`test`);
    const fileName = file ? file.split("/")[3] + "/" + file.split("/")[4] : "";

    if (fileName) {
      const body = {
        fileName: fileName,
      };
      const result = await deleteImageS3(body);
      setFile(null);
    }
  };

  //   dayjs.extend(customParseFormat);
  //   console.log(`file test`, file);
  return (
    <>
      <form
        onSubmit={Form.onSubmit((val) =>
          type == "add" ? addSplashImages(val) : updateSplashImages(val)
        )}
      >
        <Grid>
          <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
            <TextInput
              w={"100%"}
              maw={"600px"}
              label="Name"
              placeholder="Name"
              key={Form.key(`name`)}
              {...Form.getInputProps("name")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
            <TextInput
              w={"100%"}
              maw={"600px"}
              label="Description"
              placeholder="description"
              key={Form.key(`description`)}
              {...Form.getInputProps("description")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
            <DatePickerInput
              w={"100%"}
              maw={"600px"}
              type="range"
              valueFormat="YYYY-MM-DD"
              label="Dates range"
              placeholder="Dates range"
              value={value}
              onChange={setValue}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
            {!file ? (
              <>
                <Dropzone
                  loading={isLoad}
                  bd={`1px dashed`}
                  onDrop={handleImageUpload}
                  maxFiles={1}
                  // multiple={false}
                  onReject={(files) => console.log("rejected files", files)}
                  maxSize={5 * 1024 ** 2}
                  w={`max-content`}
                  px={`2rem`}
                  accept={IMAGE_MIME_TYPE}
                  style={{
                    borderRadius: `1rem`,
                  }}
                  // {...props}
                >
                  <Group
                    justify="start"
                    // gap="xl"
                    mih={220}
                    miw={330}
                    style={{ pointerEvents: "none" }}
                  >
                    <Dropzone.Accept>
                      <IconUpload
                        style={{
                          width: rem(52),
                          height: rem(52),
                          color: "var(--mantine-color-blue-6)",
                        }}
                        stroke={1.5}
                      />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX
                        style={{
                          width: rem(52),
                          height: rem(52),
                          color: "var(--mantine-color-red-6)",
                        }}
                        stroke={1.5}
                      />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconPhoto
                        style={{
                          width: rem(52),
                          height: rem(52),
                          color: "var(--mantine-color-dimmed)",
                        }}
                        stroke={1.5}
                      />
                    </Dropzone.Idle>

                    <div>
                      <Text size="xl" inline>
                        Drag images here or click to select files
                      </Text>
                      <Text size="sm" c="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not
                        exceed 5mb
                      </Text>
                    </div>
                  </Group>
                </Dropzone>
              </>
            ) : (
              <>
                <Flex
                  justify={`center`}
                  align={`center`}
                  className={css.image}
                  mt={`xs`}
                  w={`150px`}
                  h={`150px`}
                  bd={`1px solid gray`}
                  onClick={() => {
                    handleDeleteImage();
                    setFile(null);
                  }}
                  style={{
                    overflow: `hidden`,
                    cursor: `pointer`,
                    borderRadius: `0.5em`,
                  }}
                >
                  <img
                    width={`100%`}
                    style={{
                      position: "relative",
                    }}
                    alt="preview image"
                    src={file}
                  />
                  <FontAwesomeIcon
                    className={css.icon}
                    icon={faTrashCan}
                    style={{
                      position: "absolute",
                      fontSize: "24px",
                      color: `red`,
                      opacity: " !important",
                      // display: `none`,
                    }}
                  />
                </Flex>
              </>
            )}
          </Grid.Col>
        </Grid>
        <Button loading={isOpen} mt={`xl`} type="submit">
          {type == "add" ? `Add` : "Update"}
        </Button>
      </form>
    </>
  );
}
