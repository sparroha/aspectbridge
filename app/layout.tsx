import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/css/styles_asb.css'
import '../public/css/style.css'
import '../public/css/helper.css'
import { Metadata } from 'next'
import NavSegment from './globalheader'

export const metadata: Metadata = {
  title: 'Aspect Bridge',
  description: 'Aspect Bridge Test Platform',
  applicationName: 'Aspect Bridge',
  authors: [{url:'https://aspectbridge.com', name:'Keith Dockery'}],
  keywords: 'Aspect Bridge, Aspect, Bridge, AspectBridge, Aspect-Bridge, Aspect_Bridge, AspectBridge.com, Aspect-Bridge.com, Aspect_Bridge.com',
  viewport: 'width=device-width, initial-scale=1',
  creator: 'Keith Dockery',
  publisher: 'Aspect Bridge',
  //icons: 'assets/binary2.png',
  //assets: 'https://aspectbridge.com/assets',
}
export default async function RootLayout({children}: {children: React.ReactNode}) {
  return <html lang={'en'}>
    <body>
      <div className='container-fluid aspect'>
        <div id='header' className='row well-sm tcenter'>
          <div className='col-12 tcenter navy_back title logo'>
            <h1>Aspect Bridge</h1>
            <NavSegment root={'bridge'}/>
          </div>
        </div>
        <div id="content" className='row'>
          <div className='col-12'>
            {children}
          </div>
        </div>
      </div>
    </body>
  </html>
}