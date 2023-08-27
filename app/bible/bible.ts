'use client'
import { alephbeth } from "../../components/hebrew"


type Word = string
type Verse = {id?: number, name?: string, vrs: Word[], variants: Word[][]}
type Chapter = {id?: number, name?: string, chptr: Verse[]}
type Book = {id?: number, name?: string, bk: Chapter[]}
type Liber = {id?: number, name?: string, lib: Book[]}

//<Proto-I-E>*leb-: lip, lick , hang loosely
//heart: leb
//brain: lob
//book: lib
//lip: lab
//slip: lub

//Greek
//logos: word
//lobos: lip ({lobe: to hang loosely})

export class Elements{
    ALEPHBETH: {}

    YHVH: string
    ELOHIM: string
    THEY: string
    RUAK: string
    AUR: string

    ROAR: string
    AURA: string
    
    Fire: string[]
    Reflection: string
    Friction: string
    Reaction: string

    Water: string[]
    Irrigation: string
    Dilusion: string
    Current: string

    Air: string[]
    Breath: string
    Expansion: string
    Mediation: string

    Earth: string[]
    Fortification: string
    Foundation: string
    Fertilization: string

    Bible: Liber


    
    constructor(){
        this.ALEPHBETH = alephbeth
        this.YHVH = alephbeth.yod.uni + alephbeth.he.uni + alephbeth.vav.uni + alephbeth.he.uni
        this.ELOHIM = alephbeth.aleph.uni + alephbeth.lamed.uni + alephbeth.vav.uni + alephbeth.he.uni + alephbeth.yod.uni + alephbeth.mem.uni
        this.THEY = alephbeth.tav.uni + alephbeth.he.uni + alephbeth.yod.uni
        this.RUAK = alephbeth.resh.uni + alephbeth.vav.uni + alephbeth.keth.uni
        this.AUR = alephbeth.aleph.uni + alephbeth.vav.uni + alephbeth.resh.uni

        this.ROAR = 'Yam'
        this.AURA = 'Yom'

        this.Reflection = 'mirror, blinding flash, focus light, illusion, misdirect, alert, signal'
        this.Friction = 'flint(earth) + steal(earth) = fire'
        this.Reaction = 'chem, sodium(earth salt) + water = fire, electron exchange, '
        this.Fire = [this.Reflection,this.Friction,this.Reaction]

        this.Irrigation = 'hose, capilary action, obstruction and '
        this.Dilusion = 'purify, soften, lubricate'
        this.Current = 'drain, flow, cleanse, relese'
        this.Water = [this.Irrigation, this.Dilusion, this.Current]

        this.Breath = 'bellows, fan, current, air to water to air, aquarius'
        this.Expansion = 'fill space, '
        this.Mediation = 'coming and gowing, eb and flow, shared by all'
        this.Air = [this.Breath, this.Expansion, this.Mediation]

        this.Fortification = 'heavy'
        this.Foundation = 'solid'
        this.Fertilization = 'soil, fallen, salt of the earth'
        this.Earth = [this.Fortification, this.Foundation, this.Fertilization]
        this['ihvh']
    }



    'ihvh': 'Beginning, time, end'

    Light(Fire){return 'seed, spark, generation, beginning'}

    Spirit(Air){return 'air, breath, essence, mediation, manifestation'}

    Aether(Earth){return 'structure, interaction, establishment'}

    Gravity(Water){return 'darkness, place where light shines, end'}
    
}