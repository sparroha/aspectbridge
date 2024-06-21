import { alephbeth } from "../../../components/hebrew"
import { FTCardPropsPartial } from "./ftcard"

export default function Card(props: FTCardPropsPartial ) {
    const { name, order, image, strimage, type, subtype, click, color, logo, children }: FTCardPropsPartial = props
    const colorPalette = {
        red: '#af4261',
        lightred: '#df4261',
        yellow: '#f3ec78',
        blue: '#4a69bd',
        green: '#6a994e',
        darkgreen: 'darkgreen',
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
        red: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.red}, ${colorPalette.lightgray}, ${colorPalette.red}, ${colorPalette.lightgray})`,
        lightred: '#df4261',
        yellow: '#f3ec78',
        blue: '#4a69bd',
        green: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.green}, ${colorPalette.lightgray}, ${colorPalette.green}, ${colorPalette.lightgray})`,
        darkgreen: `linear-gradient(45deg, ${colorPalette.green}, ${colorPalette.darkgreen}, ${colorPalette.green}, ${colorPalette.darkgreen}, ${colorPalette.green})`,
        purple: '#6a4e99',
        lightpurple: '#9c5fad',
        orange: `linear-gradient(45deg, ${colorPalette.lightgray}, ${colorPalette.orange}, ${colorPalette.lightgray}, ${colorPalette.orange}, ${colorPalette.lightgray})`,
        brown: '#6a4e42',
        black: '#000000',
        white: '#ffffff',
        grey: '#6a6a6a',
        gray: '#6a6a6a',
        lightgray: '#d3d3d3',
        lightgrey: '#d3d3d3',
    }
    return <button id={'card-container'} onClick={click} style={{
            position: 'relative',
            width: '200px',
            height: '275px',
            border: '2px outset '+colorPalette.yellow,
            borderRadius: '5px',
            boxShadow: '0 0 5px 0 rgba(0,0,0,0.5)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
            margin: '10px',
            backgroundImage: gradientPalette[color] || `linear-gradient(45deg, ${colorPalette.red}, ${colorPalette.orange}, ${colorPalette.yellow}, ${colorPalette.orange})`
    }}>
        <div id={'card-name-container'} style={{
            marginTop: '0px',
            paddingLeft: '5px',
            paddingRight: '5px',
            width: '95%',
            height: '22px',
            fontSize: '11px',
            fontWeight: 'normal',
            textAlign: 'left',
            verticalAlign: 'middle',
            border: '2px outset '+colorPalette.red,
            borderRadius: '5px',
            backgroundColor: colorPalette[color] || colorPalette.orange
        }}>
            {name ? name.slice(0,1).toUpperCase()+name.slice(1) : 'Character Name'}
            <div style={{
                float: 'right',
                margin: '1px',
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
        <div id={'card-image-container'} style={{
            marginTop: '3px',
            width: '95%',
            height: '40%',
            border: '2px outset '+colorPalette.red,
            borderRadius: '5px',
            backgroundImage: image?'url('+image+')':`linear-gradient(45deg, ${colorPalette.yellow}, ${colorPalette.red})`,
            backgroundSize: 'cover',
        }}>
            {image?null:<h1 style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                font: 'bold 77px "Times New Roman", Times, serif',
            }}>{strimage || alephbeth.aleph.uni}</h1>}
        </div>
        <div id={'card-info-container'} style={{
            marginTop: '3px',
            paddingLeft: '5px',
            paddingRight: '5px',
            width: '95%',
            height: '20px',
            fontSize: '10px',
            fontWeight: 'bold',
            textAlign: 'left',
            verticalAlign: 'middle',
            border: `2px outset ${colorPalette.red}`,
            borderRadius: '5px',
            backgroundColor: colorPalette[color] || colorPalette.orange
        }}>
            {type || 'Typeholder'}{!subtype || ' -- '+subtype}
            <div style={{
                float: 'right',
                margin: '1px',
                backgroundColor: 'black',
                color: 'white',
                width: '14px',
                height: '14px',
                borderRadius: '3px',
                textAlign: 'center',
            }}>{logo.includes('http')?<img src={logo} width={'15px'} height={'15px'}/>:(logo || '#')}</div>
        </div>
        <div id={'card-function-block'} style={{
            marginTop: '3px',
            paddingLeft: '5px',
            paddingRight: '5px',
            width: '95%',
            height: '40%',
            fontSize: '12px',
            textAlign: 'left',
            border: '2px outset '+colorPalette.red,
            borderRadius: '5px',
            //backgroundImage: image?'url('+image+')':`linear-gradient(45deg, ${colorPalette.yellow}, ${colorPalette.red})`
        }}>
            {children || <p>Add one step to your journey</p>}
        </div>
    </button>
}