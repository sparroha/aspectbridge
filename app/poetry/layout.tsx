import DynamicContextProvider from './provider'

export default async function VerseLayout({ children }) {
	return <DynamicContextProvider>{children}</DynamicContextProvider>
}
