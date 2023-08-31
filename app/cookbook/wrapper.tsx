export default function Wrapper({children}) {
    return <div style={{position: 'relative', width: '100%', height: '100%'}}>
        <div style={{position: 'absolute', width: '98%', height: '98%', opacity: '.5', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #777, #fff)', zIndex: '0'}}></div>
        <div style={{position: 'absolute', width: '98%', height: '98%', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: ''}}>
        <div style={{width: '100%', height: '100%', padding: '2%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #777, #fff)', overflow: 'auto'}}>
            {children}
        </div>
        </div>
    </div>
}

export function MultiWrap({children}){
    return <div className="row" style={{minHeight: '200px', maxHeight: '300px'}}>
        {children.map((child, i)=>{
            <div key={i} style={{position: 'relative', width: '100%', height: '100%'}}>
                <div style={{position: 'absolute', width: '98%', height: '98%', opacity: '.5', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #777, #fff)', zIndex: '0'}}></div>
                <div style={{position: 'absolute', width: '98%', height: '98%', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: ''}}>
                <div style={{width: '100%', height: '100%', padding: '2%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #777, #fff)', overflow: 'auto'}}>
                    {child}
                </div>
                </div>
            </div>
        })}
    </div>
}