export function parsedRegistryData(data: any): any{
    let parsedOutput: string | {} | [] | null = data
    try{
        parsedOutput = JSON.parse(data)
    }catch(e){
        console.log(e+' | '+data)
    }
    return parsedOutput || []
}