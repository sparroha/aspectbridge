
import NavLeftDefault from '../navleft'
import NavRightDefault from '../navright'

export default async function DevLayout({children}) {
  return <div className='row'>
      <NavLeftDefault/>
      <div className='col-xs-12 col-sm-9 col-md-8'>
        {children}
      </div>
      <NavRightDefault/>
  </div>
}