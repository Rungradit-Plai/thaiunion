import axios from "axios";

const a = axios.create({
    baseURL: 'http://localhost:3000'
})

const url = 'http://localhost:3000/api/splashimages'

export async function getSplashImage () {
    // const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    const res = await fetch(url, {method: 'GET'})
    console.log(res)
    return res.json();
}
export async function addSplashImage(data:any) {
    const res = await fetch(url,{
        method:'POST',
        body:JSON.stringify(data)
    })
    return res.json();
}
export async function deleteSplashImage(id:string) {
    const res = await fetch(`${url}/${id}`,{
        method:'DELETE'
    })
    return res.json();
    
}
export async function getSplashImageById(id:string) {
    const res = await fetch(`${url}/${id}`,{
        method:'GET'
    })
    return res.json(); 
}
export async function updateSplashImageById(id:string,data:any) {
    const res = await fetch(`${url}/${id}`,{
        method:'PATCH',
        body:JSON.stringify(data)
    })
    return res.json(); 
}