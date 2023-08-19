import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/css/styles.css'
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
  //icons: 'favicon.ico',
  //assets: 'https://aspectbridge.com/assets',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return <html lang={'en'}>
      <body>{children}</body>
    </html>
}