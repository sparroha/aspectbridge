import { Metadata } from 'next'
import './magic.css'

export const metadata: Metadata = {
  title: 'Aspect of Magic',
  description: 'An exploration of the magic of reality in terms of gaming.',
  applicationName: 'Mystic Realm',
  authors: [{url:'https://aspectbridge.com', name:'Keith Dockery'}],
  keywords: 'Magic, Aspect Magic, Aspect Bridge, Aspect, Bridge, AspectBridge, Aspect-Bridge, Aspect_Bridge, AspectBridge.com, Aspect-Bridge.com, Aspect_Bridge.com',
  //viewport: {width: 'device-width', initialScale: 1},
  creator: 'Keith Dockery',
  publisher: 'Aspect Bridge',
  //icons: 'assets/binary2.png',
  //assets: 'https://aspectbridge.com/assets',
}
export default async function MagicLayout({children}) {
  return <div id={'magic_layout'}>
        {children}
  </div>
}