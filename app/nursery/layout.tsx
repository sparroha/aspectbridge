export default async function PlantsLayout({children}: {children: React.ReactNode}) {
    return <div id="content" className='row h100'>
            <div className='col-12 p0'>
              {children}
            </div>
          </div>
  }