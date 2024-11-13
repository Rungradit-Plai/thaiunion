import axios from "axios";

const a = axios.create({
    baseURL: 'http://localhost:3000'
})

const url = 'http://localhost:3000/api/upload'

export async function getSplashImage () {
    // const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    const res = await fetch(url, {method: 'GET'})
    console.log(res)
    return res.json();
}
export async function uploadImageS3(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(url,{
        method:'POST',
        body:formData
    })
    return res.json();
}
export async function deleteImageS3(data) {
  
    const res = await fetch(url,{
        method:'DELETE',
        body:JSON.stringify(data)
    })
    return res.json();
}
