'use client'
export default function Plants({params, searchParams}){
    
    return <div style={{position: 'relative', height: '100%', backgroundColor: 'white', color: 'black'}}>
        <div id={'intro'} className={'row'} style={{width: '100%'}}>
            <h1>Aspect Gardens</h1>
            <div className={'col-4'}>
                <img src={'/assets/teal_banner.jpg'} style={{width: '100%'}}/>
            </div>
            <div className={'col-8'}>
                <p>Aspect Gardens is a small, family run business based in Pensacola/Chattanooga. We raise a variaty of interesting crops. Out primary focus is food crops. We nurse various plants with other uses besides consumprion, such as firbre rich or medicinal plants.</p>
            </div>
        </div>
        <div id={'carosel'} className={'row'} style={{width: '100%'}}>
            <div className={'col-12'} style={{display: 'flex', overflowX: 'hidden'}} onWheel={(e)=>{e.currentTarget.scrollLeft+=e.deltaY}}>
                {[
                    '/assets/banner.jpg',
                    '/assets/teal_banner.jpg',
                    '/assets/terraforge_bg.jpg',
                    '/assets/banner.jpg',
                    '/assets/teal_banner.jpg',
                    '/assets/terraforge_bg.jpg',
                    '/assets/banner.jpg',
                    '/assets/teal_banner.jpg',
                    '/assets/terraforge_bg.jpg'
                ].map((img, i) => {
                    return <div key={i} style={{margin: '20px'}}><a href={img}><img src={img} style={{minWidth: '400px', maxWidth: '100%', border: '2px gray solid', borderRadius: '10px'}}/></a></div>
                })}
            </div>
        </div>
    </div>
}
