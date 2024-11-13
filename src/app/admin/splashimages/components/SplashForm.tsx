'use client'
import { Button, Checkbox, Group, TextInput ,Grid, FileInput,Box} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { addSplashImage,updateSplashImageById } from '@/app/server/admin/splashimages';
import ModalLoaderSuccess from '../../component/ModalLoaderSuccess'; 
import ModalDelete from './ModalDelete';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { getSplashImageById } from '@/app/server/admin/splashimages';
import { uploadImageS3,deleteImageS3 } from '@/app/server/admin/upload';


export default  function SplashForm({type,data,id}){
    const [isOpen,setOpen] = useState(false);
    // const [list,setList] = useState({});
    const [file,setFile] = useState(data?.image_path);
  

    
    // console.log('test',data)
    const Form =  useForm({
        mode:'uncontrolled',
        initialValues : 
        {
            name:data? data.name : '',
            description:data? data.description:'',
            start_date:data? new Date(Date.parse(data.start_date)):'',
            end_date: data ? new Date(Date.parse(data.end_date)):'',
            image_path:data? data.image_path:'',
        },
        validate:{
            name:(value) => (value.length < 2 ? `Name must have at least 2 letters`:null),
            description:(value) => (value.length < 2 ? `description must have at least 2 letters`:null),
            start_date:(value) => (value.length < 2 ? `start_date must have at least 2 letters`:null),
            end_date:(value) => (value.length < 2 ? `end_date must have at least 2 letters`:null)
        }
    });
    async function addSplashImages(val) {
        val = {...val,image_path:file}
        setOpen(true)
        const result = await addSplashImage(val)
        if(result.status == 200){
            setTimeout(()=>{
                setOpen(false)
            },3000)
        }
        redirect(`/admin/splashimages`)
    }
    async function updateSplashImages(val){
        val = {...val,image_path:file}
        setOpen(true)
        const result = await updateSplashImageById(id,val)
        if(result.status == 200){
            setTimeout(()=>{
                setOpen(false)
            },3000)
        }
        redirect(`/admin/splashimages`)
    }

    const handleImageUpload = async (event) => {
        const file = event;
        const result = await uploadImageS3(file)
        console.log(result)
        if(result.status == 200){
            setFile(result?.data?.fileName || null)
        }
    };
    const handleDeleteImage = async () =>{
        const fileName = file? file.split('/')[3]+'/'+file.split('/')[4]:'';
        if(fileName) {
            const body = {
                fileName:fileName
            };
            const result = await deleteImageS3(body)
        }
    }
    dayjs.extend(customParseFormat);
    console.log(`file test`,file)
    return (
        <>
            <form onSubmit={Form.onSubmit(
                (val) => type == 'add' ? addSplashImages(val):updateSplashImages(val)
            )}>
                <Grid>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                        <TextInput
                            label="Name"
                            placeholder='Name'
                            key={Form.key(`name`)}
                            {...Form.getInputProps('name')}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                        <TextInput
                            label="Description"
                            placeholder='description'
                            key={Form.key(`description`)}
                            {...Form.getInputProps('description')}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                        <DateInput
                            valueFormat="DD/MM/YYYY HH:mm:ss"
                            label="วันที่เริ่มต้น"
                            placeholder="Date input"
                            key={Form.key(`start_date`)}
                            {...Form.getInputProps('start_date')}
                            />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                        <DateInput
                            valueFormat="DD/MM/YYYY HH:mm:ss"
                            label="วันที่สิ้นสุด"
                            placeholder="Date input"
                            key={Form.key(`end_date`)}
                            {...Form.getInputProps('end_date')}
                            />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                        <FileInput
                        // src={file}
                        // type='file'
                            label="image"
                            key={Form.key(`image_path`)}
                            {...Form.getInputProps('image_path')}
                            // description="Input description"
                            onChange={handleImageUpload}
                            
                            placeholder="upload file"/>
                            {file &&
                                (
                                    <Box mt={`xs`} w={`150px`} h={`150px`} onClick={()=>{
                                        handleDeleteImage();
                                        setFile(null);
                                        
                                    }}
                                    style={{
                                        overflow:`hidden`,
                                        cursor:`pointer`
                                    }}
                                    > 
                                        <img width={`100%`} alt="preview image" src={file} />
                                     </Box>
                                )
                            }
                            
                    </Grid.Col>

                </Grid>
                <Button loading={isOpen} mt={`xl`} type='submit'>{type == 'add' ? `Add` : 'Update'}</Button>
                {/* <ModalLoaderSuccess opened={isOpen} /> */}
            </form>
        </>
    )
}