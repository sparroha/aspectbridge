import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'public/css/styles_asb.css'
import 'public/css/style.css'
import '../public/css/style.css'
import '../public/css/helper.css'
import '../static/josh/css/landscape.css'
import '../public/css/sliders.css'
import '../public/css/cardgame.css'
import '../public/css/sandbox.css'
import { Metadata } from 'next'

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
export async function generateMetadata({params}) {
  if(params.aspect)return {
    ...metadata,
    title: `${params.aspect[0]+"'s " || ''}Bridge`,
  }
}
export default async function RootLayout({children}: {children: React.ReactNode}) {
  return <html lang={'en'}>
      <body>{children}</body>
    </html>
}