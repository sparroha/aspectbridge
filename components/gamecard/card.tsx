import { alephbeth } from "../hebrew"
import { FTCardPropsPartial } from "./ftcard"

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
    const gradientPalette = {
        red: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.red}, ${colorPalette.lightgray}, ${colorPalette.red}, ${colorPalette.lightgray}, ${colorPalette.red}, ${colorPalette.lightgray})`,
        lightred: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.lightred}, ${colorPalette.lightgray}, ${colorPalette.lightred}, ${colorPalette.lightgray}, ${colorPalette.lightred}, ${colorPalette.lightgray})`,
        yellow: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.yellow}, ${colorPalette.lightgray}, ${colorPalette.yellow}, ${colorPalette.lightgray}, ${colorPalette.yellow}, ${colorPalette.lightgray})`,
        blue: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.blue}, ${colorPalette.lightgray}, ${colorPalette.blue}, ${colorPalette.lightgray}, ${colorPalette.blue}, ${colorPalette.lightgray})`,
        green: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.green}, ${colorPalette.lightgray}, ${colorPalette.green}, ${colorPalette.lightgray}, ${colorPalette.green}, ${colorPalette.lightgray})`,
        darkgreen: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.darkgreen}, ${colorPalette.lightgray}, ${colorPalette.darkgreen}, ${colorPalette.lightgray}, ${colorPalette.darkgreen}, ${colorPalette.lightgray})`,
        purple: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.purple}, ${colorPalette.lightgray}, ${colorPalette.purple}, ${colorPalette.lightgray}, ${colorPalette.purple}, ${colorPalette.lightgray})`,
        lightpurple: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.lightpurple}, ${colorPalette.lightgray}, ${colorPalette.lightpurple}, ${colorPalette.lightgray}, ${colorPalette.lightpurple}, ${colorPalette.lightgray})`,
        orange: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.orange}, ${colorPalette.lightgray}, ${colorPalette.orange}, ${colorPalette.lightgray}, ${colorPalette.orange}, ${colorPalette.lightgray})`,
        brown: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.brown}, ${colorPalette.lightgray}, ${colorPalette.brown}, ${colorPalette.lightgray}, ${colorPalette.brown}, ${colorPalette.lightgray})`,
        black: `linear-gradient(45deg, ${colorPalette.gray}, ${colorPalette.black}, ${colorPalette.gray}, ${colorPalette.black}, ${colorPalette.gray}, ${colorPalette.black}, ${colorPalette.gray})`,
        white: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.white}, ${colorPalette.lightgray}, ${colorPalette.white}, ${colorPalette.lightgray}, ${colorPalette.white}, ${colorPalette.lightgray})`,
        grey: `linear-gradient(45deg, ${colorPalette.lightgrey}, ${colorPalette.grey}, ${colorPalette.lightgrey}, ${colorPalette.grey}, ${colorPalette.lightgrey}, ${colorPalette.grey}, ${colorPalette.lightgrey})`,
        gray: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.gray}, ${colorPalette.lightgray}, ${colorPalette.gray}, ${colorPalette.lightgray}, ${colorPalette.gray}, ${colorPalette.lightgray})`,
        lightgray: `linear-gradient(45deg, ${colorPalette.white}, ${colorPalette.lightgrey}, ${colorPalette.white}, ${colorPalette.lightgrey}, ${colorPalette.white}, ${colorPalette.lightgrey}, ${colorPalette.white})`,
        lightgrey: `linear-gradient(45deg, ${colorPalette.white}, ${colorPalette.lightgray}, ${colorPalette.white}, ${colorPalette.lightgray}, ${colorPalette.white}, ${colorPalette.lightgray}, ${colorPalette.white})`,
    }
    return <Base>
        <Name/>
        <Image/>
        <Info/>
        <Functionality/>
    </Base>

    function Base(props){
        return <button id={'card-container-'+name} onClick={click} style={{
            position: 'relative',
            width: '200px',
            height: '275px',
            border: '2px outset '+colorPalette[color],
            borderRadius: '5px',
            boxShadow: '0 0 25px 0 rgba(0,0,0,0.5)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
            margin: '10px',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundImage: gradientPalette[color] || `linear-gradient(45deg, ${colorPalette.red}, ${colorPalette.orange}, ${colorPalette.yellow}, ${colorPalette.orange})`
        }}>
            {props.children}
        </button>
    }
    function Name(){
        return <div id={'card-name-container-'+name} style={{
            marginTop: '0px',
            paddingTop: '2px',
            paddingLeft: '5px',
            paddingRight: '5px',
            width: '95%',
            height: '22px',
            color: '#ddd',
            fontSize: '11px',
            fontWeight: 'bold',
            textAlign: 'left',
            verticalAlign: 'middle',
            border: '2px outset '+colorPalette[color],
            borderRadius: '5px',
            backgroundColor: colorPalette[color] || colorPalette.orange
        }}>
            {name ? name.slice(0,1).toUpperCase()+name.slice(1) : 'Character Name'}
            <div style={{
                float: 'right',
                backgroundColor: colorPalette['gray'],
                color: 'white',
                fontWeight: 'normal',
                fontSize: '11px',
                width: '15px',
                height: '15px',
                borderRadius: '3px',
                textAlign: 'center',
            }}>{order || '#'}</div>
        </div>
    }
    function Image(){
        return <div id={'card-image-container-'+name} style={{
            marginTop: '3px',
            width: '95%',
            height: '40%',
            border: '2px outset '+colorPalette[color],
            borderRadius: '5px',
            backgroundImage: image?'url('+image+')':`linear-gradient(45deg, ${colorPalette.grey}, ${colorPalette.white})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }}>
            {image?null:<h1 style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                font: 'bold 77px "Times New Roman", Times, serif',
            }}>{strimage || alephbeth.aleph.uni}</h1>}
        </div>
    }
    function Info(){
        return <div id={'card-info-container-'+name} style={{
            marginTop: '3px',
            paddingTop: '1px',
            paddingLeft: '5px',
            paddingRight: '5px',
            width: '95%',
            height: '20px',
            color: '#ddd',
            fontSize: '10px',
            fontWeight: 'bold',
            textAlign: 'left',
            verticalAlign: 'middle',
            border: `2px outset ${colorPalette[color]}`,
            borderRadius: '5px',
            backgroundColor: colorPalette[color] || colorPalette.orange
        }}>
            {type || 'Typeholder'}{!subtype || ' -- '+subtype}
            <div style={{
                float: 'right',
                backgroundColor: 'transparent',
                color: 'white',
                width: '14px',
                height: '14px',
                borderRadius: '3px',
                textAlign: 'center',
            }}>{logo.includes('http')?<img src={logo} width={'15px'} height={'15px'}/>:(logo || '#')}</div>
        </div>
    }
    function Functionality(){
        return <div id={'card-function-container-'+name} style={{
            marginTop: '3px',
            paddingLeft: '5px',
            paddingRight: '5px',
            width: '95%',
            height: '40%',
            fontSize: '10px',
            textAlign: 'left',
            border: '2px outset '+colorPalette[color],
            borderRadius: '5px',
            //backgroundImage: image?'url('+image+')':`linear-gradient(45deg, ${colorPalette.yellow}, ${colorPalette.red})`
        }}>
            {children || <p>Add one step to your journey</p>}
        </div>
    }
}