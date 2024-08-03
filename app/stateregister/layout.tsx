import React from 'react'
import DynamicContextProvider from './provider'
import StateRegisterContextProvider from './provider'

export default function VerseLayout({ children }) {
	return <StateRegisterContextProvider>{children}</StateRegisterContextProvider>
}
