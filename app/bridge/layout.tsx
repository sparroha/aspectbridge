import { Metadata } from 'next'
import NavLeftDefault from '../navleft'
import NavRightDefault from '../navright'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Aspect Bridge',
  description: 'Aspect Bridge Test Platform',
  applicationName: 'Aspect Bridge',
  authors: [{url:'https://aspectbridge.com', name:'Keith Dockery'}],
  keywords: 'Aspect Bridge, Aspect, Bridge, AspectBridge, Aspect-Bridge, Aspect_Bridge, AspectBridge.com, Aspect-Bridge.com, Aspect_Bridge.com',
  //viewport: {width: 'device-width', initialScale: 1},
  creator: 'Keith Dockery',
  publisher: 'Aspect Bridge',
}
export default async function BridgeLayout({children}) {
  return <div className='row'>
      <SpeedInsights/>
      <NavLeftDefault/>
      <div className='col-xs-12 col-sm-9 col-md-8'>
        {children}
      </div>
      <NavRightDefault/>
  </div>
}