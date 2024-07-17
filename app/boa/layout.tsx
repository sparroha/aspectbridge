import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bridge of Aspects',
}
export default async function BridgeLayout({children}) {
  return <div className='container '>
        {children}
  </div>
}