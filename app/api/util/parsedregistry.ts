import { RegistryEntry } from "../registry/route"

export function parsedRegistryData(data: string): any{
    if(data.charAt(0) != '[' && data.charAt(0) != '{') return data as string
    let parsedOutput
    try{
        parsedOutput = JSON.parse(data)
    }catch(e){
        console.log(e+' | '+data)
    }
    return parsedOutput || []
}
