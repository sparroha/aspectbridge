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
        <div className='row h100 w100'>{children}</div>
        <br/>
        <hr/>
        <div className='row hauto'>
          <a href='/test/ident?a=2&b=2'>aspectbridge.com/test/<i>ident?a=2&b=2</i></a><br/>
          <a href='/test/2?id=2'>aspectbridge.com/test/<i>2?id=2</i></a><br/>
          <a href='/test/account/2?a=2&b=2'>aspectbridge.com/test/<i>account/2?a=2&b=2</i></a><br/>
        </div>
  </div>
}