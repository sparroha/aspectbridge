import { neonLaser } from "../../lib/util/gfx/laser";

export default async function RootLayout({children}: {children: React.ReactNode}) {
    return <div id="content" className='row' style={{height: '100%'}}>
            <div className='col-12' style={{height: '100%', padding: 0}}>
              {children}
            </div>
          </div>
  }