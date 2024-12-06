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
} from "@mantine/core";
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

      //   start_date: (value) =>
      //     value.length < 2 ? `start_date must have at least 2 letters` : null,
      //   end_date: (value) =>
      //     value.length < 2 ? `end_date must have at least 2 letters` : null,
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
    if (result.status == 200) {
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
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
    if (result.status == 200) {
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
    redirect(`/admin/splashimages`);
  }

  const handleImageUpload = async (event: any) => {
    await handleDeleteImage();
    setFile(null);
    const file = event;
    setLoading(true);
    const result = await uploadImageS3(file);
    console.log(result);
    if (result.status == 200) {
      setFile(result?.data?.fileName || null);
      setLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    const fileName = file ? file.split("/")[3] + "/" + file.split("/")[4] : "";
    if (fileName) {
      const body = {
        fileName: fileName,
      };
      const result = await deleteImageS3(body);
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
          {/* <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
            <DateInput
              w={"100%"}
              type="range"
              maw={"600px"}
              valueFormat="DD/MM/YYYY HH:mm:ss"
              label="วันที่เริ่มต้น"
              placeholder="Date input"
              key={Form.key(`start_date`)}
              {...Form.getInputProps("start_date")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
            <DateInput
              w={"100%"}
              maw={"600px"}
              valueFormat="DD/MM/YYYY HH:mm:ss"
              label="วันที่สิ้นสุด"
              placeholder="Date input"
              key={Form.key(`end_date`)}
              {...Form.getInputProps("end_date")}
            />
          </Grid.Col> */}
          <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
            <DatePickerInput
              w={"100%"}
              maw={"600px"}
              type="range"
              valueFormat="YYYY-MM-DD"
              label="Pick dates range"
              placeholder="Pick dates range"
              value={value}
              onChange={setValue}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
            <FileInput
              w={"100%"}
              maw={"600px"}
              label="Image"
              key={Form.key(`image_path`)}
              {...Form.getInputProps("image_path")}
              // description="Input description"
              onChange={handleImageUpload}
              placeholder="upload file"
            />
            {isLoad ? (
              <Box m={2}>
                <Loader color="blue" />
              </Box>
            ) : (
              <>
                {file && (
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
                        // display: `none`,
                      }}
                    />
                  </Flex>
                )}
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
