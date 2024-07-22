export type Tile = {
    x: number,
    y: number,
    type?: string,
    image?: string,
    f?: ()=>void
}
export type D1 = any
export type D2 = D1[]
export type D3 = D2[]
export type D4 = D3[]

export type Map = Tile[][]

