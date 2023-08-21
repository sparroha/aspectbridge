
export class Registry{
    uuid: string
    defaultValue: any
    registryLoaded: boolean
    postData: string
    getData: string
    parsedData: any
    constructor(uuid: string, defaultValue: any){
        this.uuid = uuid
        this.defaultValue = defaultValue
        this.registryLoaded = false
        this.postData = JSON.stringify(defaultValue) || null
        this.getData = null
        this.parsedData = null
        try{
            this.parsedData = JSON.parse(this.getData)
        }catch(err){
            this.parsedData = this.getData
        }
    }

    put = async (data, uuid?: string)=>{
        setDB(uuid || this.uuid, data)
    }
    get = async (uuid?: string)=>{
        this.getData = await getDB(uuid || this.uuid)
        return this.getData
    }

}


//updates database with current register ref
export async function setDB(name: string, data: any){
    //console.log('@setDB://set '+name+' to '+JSON.stringify(data))
    await fetch(`/api/registry/${name}`, {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(res => {
        //console.log('@setDB://res: '+JSON.stringify(res))//always {}
        return res.json()
    })
}

export async function getDB(name: string, signal?: AbortSignal): Promise<string>{
    return fetch(`/api/registry/${name}`,{signal: signal}).then(res=>res.json())
}
