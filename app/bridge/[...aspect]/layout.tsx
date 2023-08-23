'use client'
import React from 'react'
import NavLeftDefault from '../../navleft'
import NavRightDefault from '../../navright'

export default async function BridgeLayout({children}) {
  return <div className='row'>
      <NavLeftDefault/>
      <div className='col-xs-12 col-sm-9 col-md-8' style={{height: '100vh'}}>
        {children}
      </div>
      <NavRightDefault/>
  </div>
}