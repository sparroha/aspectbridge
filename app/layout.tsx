import React from 'react'
//import Router from 'next/navigation'
import { Metadata, Viewport } from 'next'
import LayoutHeader from './layout_header'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/css/style.css'
import '../public/css/helper.css'

export const galaxyImg = 'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'
export const metadata: Metadata = {
  title: 'Aspect Bridge Root',
  description: 'Aspect Bridge Test Platform',
  applicationName: 'Aspect Bridge',
  authors: [{url:'https://aspectbridge.com', name:'Keith Dockery'}],
  keywords: 'Aspect Bridge, Aspect, Bridge, AspectBridge, Aspect-Bridge, Aspect_Bridge, AspectBridge.com, Aspect-Bridge.com, Aspect_Bridge.com',
  creator: 'Keith Dockery',
  publisher: 'Aspect Bridge',
  icons: galaxyImg,
  assets: '/assets',
}
export const viewport: Viewport = {width: 'device-width', initialScale: 1}
export default async function RootLayout({children}: {children: React.ReactNode}) {
  return <html lang={'en'} /*style={{maxHeight: '100vh'}}*/>
    <body>
      <div className='container-fluid aspect h100'>
        <div id='header' className='row well-sm tcenter logo hauto'>
          <div className='col-xs-12 col-sm-3 col-md-2 col-lg-1 tcenter navy_back title h100'>
            <a href={'/bridge'}>
              <img src={galaxyImg} height={'100px'} style={{borderRadius: '50%'}}/>
            </a>
          </div>
          <div className='col-xs-12 col-sm-9 col-md-10 col-lg-11 tcenter navy_back title h100'>
            <h2>Aspect Bridge</h2>
            <LayoutHeader root={'bridge'}/>
          </div>
        </div>
        <div id="content" className='row hauto'>
          <div className='col-12 h100 p0'>
            {children}
          </div>
        </div>
      </div>
    </body>
  </html>
}