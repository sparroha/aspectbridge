export type Tile = {
    x: number,
    y: number,
    type?: string,
    image?: string,
    f?: ()=>void
}
export type Map = Tile[][]
export type Tiles = {
    [key: string]: Tile
}
export type Player = {
    x: number,
    y: number
}
export type Game = {
    map: Map | Tiles,
    player: Player
}
export class TileClass {
    x: number
    y: number
    type?: string
    image?: string
    f?: ()=>void
    constructor(newTile: Tile){
        this.x = newTile.x
        this.y = newTile.y
        this.type = newTile.type || 'void'
        this.image = newTile.image || 'grass.png'
        this.f = newTile.f || (()=>{});
    }
}

export function createTile(tile: Tile){
    let div = document.createElement('div')
    div.style.width = '100px'
    div.style.height = '100px'
    div.style.backgroundImage = `url(${tile.image})`
    div.onclick = tile.f
    document.body.appendChild(div)
}


/*let t: Tile = {
    x: 0,
    y: 0,
    type: 'grass',
    image: 'grass.png',
    f: ()=>console.log('clicked')
}*/
//let T: TileClass = new TileClass(t)
//T.f()
export type D1 = any
export type D2 = D1[]
export type D3 = D2[]
export type D4 = D3[]