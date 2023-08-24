import { Metadata } from 'next'
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
            {children}
        </div>
}