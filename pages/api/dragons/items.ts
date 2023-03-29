import sql from "../../../lib/,base/sql"
//TODO indev: follow events.ts
export type Item = {
    id?: number,
    name: string,
    description?: string,
    image?: string,
    onuse?: string[],//JSON.stringify(['function1', 'function2'])
    
}
export default async function getItemInfo(req?, res?) {
    //TABLE DOE NOT EXIST EXISTS
    /*const newTable = await sql`CREATE TABLE IF NOT EXISTS aspect_dragons_items_ (
                        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        name varchar(255),
                        description varchar(255),
                        image varchar(255),
                        onuse varchar(255),
                    );`*/
    //call array from table
    try {
        const items: Item[] = await getItems()
        return res.status(200).json({tiles: JSON.stringify(items), message: 'Items found', success: true})
    } catch (error) {
        return res.status(404).json({tiles: [null], message: 'No items found', success: false})
    }
}
export async function getItems(selector: string = '*'): Promise<Item[]> {
    try {
        const items = await sql`select * from aspect_dragons_items_;`
        console.log(items)
        const itemInfo: Item[] = items.map((item) => {
            return {
                id: item.id,
                name: item.name,
                description: item.description,
                image: item.image,
                use: JSON.parse(item.use),
            }
        })
        return itemInfo
    } catch (error) {
        console.log(error)
        return [null]
    }
}
//**********
/*
login(userCredentials) {
    // Get a token from api server using the fetch api
    return this.fetch(`${this.domain}/api/login`, {
        method: 'POST',
        headers: new Headers({'Content-Type':'application/json'}),
        body: JSON.stringify(userCredentials)
    }).then(res => return res.json())
    .then((res) => {
          console.log('statusCode:'+ res.status)
          console.log('Token:' +res.token)
          this.setToken(res.token) // Setting the token in localStorage
          return Promise.resolve(res);

    })
}
*/