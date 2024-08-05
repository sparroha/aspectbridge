import React from 'react'
import DynamicContextProvider from './provider'

export default function VerseLayout({ children }) {
	return <DynamicContextProvider>{children}</DynamicContextProvider>
}
