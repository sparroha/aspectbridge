import { Metadata } from 'next'
import Wrapper from './wrapper'
import '../../public/css/cookbook.css'

export const metadata: Metadata = {
  title: 'Cookbook',
  description: 'Aspect Bridge Test Platform',
  applicationName: 'Aspect Bridge',
  authors: [{url:'https://aspectbridge.com/cookbook', name: 'Josh Logan'},{url:'https://aspectbridge.com', name:'Keith Dockery'}],
  keywords: 'Cookbook, Projects, Aspect Bridge, Aspect, Bridge, AspectBridge, Aspect-Bridge, Aspect_Bridge, AspectBridge.com, Aspect-Bridge.com, Aspect_Bridge.com',
  viewport: 'width=device-width, initial-scale=1',
  creator: 'Josh "Zypk" Logan',
  publisher: 'Aspect Bridge',
  //icons: 'assets/binary2.png',
  //assets: 'https://aspectbridge.com/assets',
}
export default async function RootLayout({children}) {
  return <div id="cookbook_layout" style={{width: '100%', height: '100%'}}>
    <div  style={{position: 'relative', width: '100%', height: '100%'}}>
      <div style={{position: 'absolute', width: '98%', height: '98%', opacity: '.5', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #777, #fff)', zIndex: '0'}}></div>
      <div style={{position: 'absolute', width: '98%', height: '98%', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: ''}}>
        <div style={{width: '100%', height: '100%', padding: '2%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #777, #fff)', overflow: 'auto'}}>
          {children}
        </div>
      </div>
    </div>
  </div>
}