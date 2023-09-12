import ZRCProvider from "./provider";

export default async function OTGLayout({children}) {
    return <ZRCProvider>
          {children}
        </ZRCProvider>
  }