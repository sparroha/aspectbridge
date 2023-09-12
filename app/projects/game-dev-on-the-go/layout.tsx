import ZRCProvider from "./provider";

export default async function BridgeLayout({children}) {
    return <ZRCProvider>
          {children}
        </ZRCProvider>
  }