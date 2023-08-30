import { Metadata } from 'next'
import "public/assets/320px-Old_Persian_cuneiform.jpg"

export const metadata: Metadata = {
  title: 'Lexical Bridge',
  description: 'Aspect Bridge Lexicon',
  applicationName: 'Aspect Bridge',
  authors: [{url:'https://aspectbridge.com', name:'Keith Dockery'}],
  keywords: 'Aspect Bridge, Aspect, Bridge, AspectBridge, Aspect-Bridge, Aspect_Bridge, AspectBridge.com, Aspect-Bridge.com, Aspect_Bridge.com',
  viewport: 'width=device-width, initial-scale=1',
  creator: 'Keith Dockery',
  publisher: 'Aspect Bridge',
  //icons: 'assets/binary2.png',
  //assets: 'https://aspectbridge.com/assets',
}
export default async function BridgeLayout({children}) {
  return <div className='row'>
    <div className='col-xs-12 col-sm-12 col-md-1 col-lg-2'></div>
    <div className='col-xs-12 col-sm-8 col-md-8 col-lg-8'>
      {children}
    </div>
    <div className='col-xs-12 col-sm-4 col-md-3 col-lg-2'>
      <img src='assets/320px-Old_Persian_cuneiform.jpg' style={{width: 204-16+'px'}}/>
      <img src='assets/Akkadian_syllabary.svg.png' style={{width: 250+'px', backgroundColor: 'tan'}}/>
    </div>
  </div>
}