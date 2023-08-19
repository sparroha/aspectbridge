export default async function fetchIP(){
    const ip = await fetch(`http://aspectbridge.com/api/getip`).then((res)=>res.json()).catch((e)=>console.log(e))
    return ip
}