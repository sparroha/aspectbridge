import { Metadata } from 'next'
import NavRightDefault from '../../navright'

export const metadata: Metadata = {
  title: 'Aspect Bridge Home2',
  description: 'Aspect Bridge Test Platform',
  applicationName: 'Aspect Bridge',
  authors: [{url:'https://aspectbridge.com', name:'Keith Dockery'}],
  keywords: 'Aspect Bridge, Aspect, Bridge, AspectBridge, Aspect-Bridge, Aspect_Bridge, AspectBridge.com, Aspect-Bridge.com, Aspect_Bridge.com',
  //viewport: {width: 'device-width', initialScale: 1},
  creator: 'Keith Dockery',
  publisher: 'Aspect Bridge',
  //icons: 'assets/binary2.png',
  //assets: 'https://aspectbridge.com/assets',
}
export default async function BridgeLayout({children}) {
  return <div className='row'>
      <div className='col-xs-12 col-sm-9 col-md-10'>
        {children}
      </div>
      <NavRightDefault/>
  </div>
}