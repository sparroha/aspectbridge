import { alephbeth } from "../hebrew"
import { FTCardPropsPartial } from "./ftcard"
import style from './cardstyle.module.css'

export default function Card(props: FTCardPropsPartial ) {
    const {name, order, image, strimage, type, subtype, click, color, logo, children }: FTCardPropsPartial = props
    const colorPalette = {
        red: '#af4261',
        lightred: '#df4261',
        yellow: '#f3ec78',
        blue: '#4a69bd',
        green: '#6a994e',
        darkgreen: 'green',
        purple: '#6a4e99',
        lightpurple: '#9c5fad',
        orange: '#af6a42',
        brown: '#6a4e42',
        black: '#000000',
        white: '#ffffff',
        grey: '#6a6a6a',
        gray: '#6a6a6a',
        lightgray: '#d3d3d3',
        lightgrey: '#d3d3d3',
    }
    const linearGradiant = (color: string, shade?: string)=>{
        let shadeColor = colorPalette[shade] || colorPalette.lightgray
        let displayColor = colorPalette[color]
        return `linear-gradient(45deg, ${shadeColor}, ${displayColor}, ${shadeColor}, ${displayColor}, ${shadeColor}, ${displayColor}, ${shadeColor})`
    }
    const gradientPalette = {
        red: linearGradiant('red'),
        lightred: linearGradiant('lightred'),
        yellow: linearGradiant('yellow'),
        blue: linearGradiant('blue'),
        green: linearGradiant('green'),
        darkgreen: linearGradiant('darkgreen'),
        purple: linearGradiant('purple'),
        lightpurple: linearGradiant('lightpurple'),
        orange: linearGradiant('orange'),
        brown: linearGradiant('brown'),
        black: linearGradiant('black','gray'),
        white: linearGradiant('white'),
        grey: linearGradiant('grey'),
        gray: linearGradiant('gray'),
        lightgray: linearGradiant('lightgray','white'),
        lightgrey: linearGradiant('lightgrey','white'),
    }
    return <Base>
        <Name/>
        <Image/>
        <Info/>
        <Functionality/>
    </Base>

    function Base(props){
        return <button id={'card-container-'+name} className={style.cardContainer} onClick={click} style={{
            border: '2px outset '+colorPalette[color],
            backgroundImage: gradientPalette[color] || `linear-gradient(45deg, ${colorPalette.red}, ${colorPalette.orange}, ${colorPalette.yellow}, ${colorPalette.orange})`
        }}>
            {props.children}
        </button>
    }
    function Name(){
        return <div id={'card-name-container-'+name} className={style.cardNameContainer}  style={{
            border: '2px outset '+colorPalette[color],
            backgroundColor: colorPalette[color] || colorPalette.orange
        }}>
            {name ? name.slice(0,1).toUpperCase()+name.slice(1) : 'Character Name'}
            <div style={{
                backgroundColor: colorPalette['gray'],
            }}>{order || '#'}</div>
        </div>
    }
    function Image(){
        return <div id={'card-image-container-'+name} className={style.cardImageContainer} style={{
            border: '2px outset '+colorPalette[color],
            backgroundImage: image?'url('+image+')':`linear-gradient(45deg, ${colorPalette.grey}, ${colorPalette.white})`,
        }}>
            {image?null:<h1>{strimage || alephbeth.aleph.uni}</h1>}
        </div>
    }
    function Info(){
        return <div id={'card-info-container-'+name} className={style.cardInfoContainer} style={{
            border: `2px outset ${colorPalette[color]}`,
            backgroundColor: colorPalette[color] || colorPalette.orange
        }}>
            {type || 'Typeholder'}{!subtype || ' -- '+subtype}
            <div style={{
                float: 'right',//for some reason this doesnt work in the css file
            }}>{logo.includes('http')?<img src={logo} width={'15px'} height={'15px'}/>:(logo || '#')}</div>
        </div>
    }
    function Functionality(){
        return <div id={'card-function-container-'+name} className={style.cardFunctionContainer} style={{
            border: '2px outset '+colorPalette[color],
            //backgroundImage: image?'url('+image+')':`linear-gradient(45deg, ${colorPalette.yellow}, ${colorPalette.red})`
        }}>
            {children || <p>Add one step to your journey</p>}
        </div>
    }
}