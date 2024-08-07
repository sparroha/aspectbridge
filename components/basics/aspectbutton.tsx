import style from './aspectbutton.module.css'
export default function AspectButton(args){
    return <button {...args} className={style.aspbtn}/>
}