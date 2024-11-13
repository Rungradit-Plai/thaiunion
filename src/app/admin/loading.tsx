import { Flex, Loader } from "@mantine/core"
export default function loading(){
    return (
        <Flex align={`center`} justify={`center`} 
        style={{
            minHeight:'50vh'
        }}>
            <Loader color="blue" />
        </Flex>
    ) 
    
}