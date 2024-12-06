import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL
const url = `${baseURL}/api/upload`

export async function getSplashImage () {
    // const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    const res = await fetch(url, {method: 'GET'})
    console.log(res)
    return res.json();
}
export async function uploadImageS3(file:File) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(url,{
        method:'POST',
        body:formData
    })
    return res.json();
}
export async function deleteImageS3(data:any) {
  
    const res = await fetch(url,{
        method:'DELETE',
        body:JSON.stringify(data)
    })
    return res.json();
}
