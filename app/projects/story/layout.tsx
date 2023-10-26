import React from 'react'

import { Metadata } from 'next'

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return <html lang={'en'}>
      <body>{children}</body>
    </html>
}