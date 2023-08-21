'use client'
import { Metadata } from 'next'
import NavLeftDefault from '../../navleft'
import NavRightDefault from '../../navright'

export async function generateMetadata({ params }): Promise<Metadata> {
  // read route params
  const aspect: string[] = params.aspect
 
  // fetch data
  //const product = await fetch(`https://.../${id}`).then((res) => res.json())
 
  // optionally access and extend (rather than replace) parent metadata
  const arkTitle = ''//(await parent).title
 
  return {
    title: arkTitle+'Aspect Bridge Home',
    icons: '/public/assets/binary2.png',
  }
}
export default async function BridgeLayout({children}) {
  return <div className='row'>
      <NavLeftDefault/>
      <div className='col-xs-12 col-sm-9 col-md-8'>
        {children}
      </div>
      <NavRightDefault/>
  </div>
}