import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bridge of Aspects',
  description: 'Bridge of Aspects standard playing card game',
  applicationName: 'Bridge of Aspects',
  authors: [{url:'https://aspectbridge.com', name:'Keith Dockery'}],
  keywords: 'Aspect Bridge, Aspect, Bridge, AspectBridge, Aspect-Bridge, Aspect_Bridge, AspectBridge.com, Aspect-Bridge.com, Aspect_Bridge.com',
  //viewport: {width: 'device-width', initialScale: 1},
  creator: 'Keith Dockery',
  publisher: 'Aspect Bridge',
  //icons: 'assets/binary2.png',
  //assets: 'https://aspectbridge.com/assets',
}
export default async function BridgeLayout({children}) {
  return <div className='container'>
    <div className='row'>
        <div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'></div>
        <div className='col-xs-12 col-sm-12 col-md-8 col-lg-8'>
        {children}
        </div>
    </div>
  </div>
}