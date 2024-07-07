import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '',
  description: '',
  applicationName: '',
  authors: [{url:'https://aspectbridge.com', name:'Keith Dockery'}],
  keywords: '',
  //viewport: {width: 'device-width', initialScale: 1},
  creator: 'Keith Dockery',
  publisher: 'Aspect Bridge',
}
export default async function Layout({children}) {
  return <div>
        {children}
  </div>
}