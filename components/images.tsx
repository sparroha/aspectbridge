import Image from "next/image";
import grass from '../public/josh/assets/Grass.png'
import banner from '../public/josh/assets/logan_banner.png'
import sunrise from '../public/josh/assets/Sunrise.png'
import blue from '../public/josh/assets/blue_collar.png'



export default function Images(){
    //return <Image src={logo} className="img-fluid grey-back" width="100%" height="100%" alt="Responsive image" />
}
export function Grass(){
    return <Image src={grass} className="img-fluid grey-back" width="100%" height="100%" alt="Responsive image" />
}
export function Banner(){
    return <Image src={banner} className="img-fluid grey-back" width="100%" height="100%" alt="Responsive image" />
}
export function Sunrise(){
    return <Image src={sunrise} className="img-fluid grey-back" width="100%" height="100%" alt="Responsive image" />
}
export function Blue(){
    return <Image src={blue} className="img-fluid grey-back" width="100%" height="100%" alt="Responsive image" />
}