import { Metadata } from 'next'
import Wrapper from './wrapper'
import '../../public/css/cookbook.css'

export const metadata: Metadata = {
  title: 'Cookbook',
  description: 'Aspect Bridge Test Platform',
  applicationName: 'Aspect Bridge',
  authors: [{url:'https://aspectbridge.com/cookbook', name: 'Josh Logan'},{url:'https://aspectbridge.com', name:'Keith Dockery'}],
  keywords: 'Cookbook, Projects, Aspect Bridge, Aspect, Bridge, AspectBridge, Aspect-Bridge, Aspect_Bridge, AspectBridge.com, Aspect-Bridge.com, Aspect_Bridge.com',
  //viewport: {width: 'device-width', initialScale: 1},
  creator: 'Josh "Zypk" Logan',
  publisher: 'Aspect Bridge',
  //icons: 'assets/binary2.png',
  //assets: 'https://aspectbridge.com/assets',
}
export default async function RootLayout({children}) {
  return <div id="cookbook_layout" style={{width: '100vw', height: '100vh'}}>
    <div  style={{position: 'relative', width: '100vw', height: '100vh'}}>
      <div style={{position: 'absolute', width: '90vw', height: '50vh', opacity: '.5', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #777, #fff)', zIndex: '0'}}></div>
      <div style={{position: 'absolute', width: '90vw', height: 'auto', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: ''}}>
        <div style={{width: '85vw', height: 'auto', padding: '2%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #777, #fff)', overflow: 'auto'}}>
          {children}
        </div>
      </div>
    </div>
  </div>
}