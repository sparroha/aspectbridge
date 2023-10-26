import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return<>
            {children}
        </>
}