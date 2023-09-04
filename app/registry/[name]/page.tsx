import sql from "../../../lib/,base/sql"

export default async function Select({params, searchParams}){
    const {name}:{name: string} = params
    let name2 = name.replaceAll('%3A',':')
    console.log('name', name2)
    const select = await sql`SELECT * FROM aspect_registry_ WHERE name = ${name2};`
    console.log('select', select)
    return <div style={{backgroundColor: 'white'}}>
        {select.map((reg, i)=>{
            let parsed = reg.registry_data
            try{
                parsed = JSON.parse(reg.registry_data)
            }catch(e){
                console.log(e+' | '+reg.registry_data)
            } 
            return <div key={i}>
                {reg.id}:&nbsp;<a href={'/registry/'+reg.name}>{reg.name}</a><br/>
                {(
                    (typeof parsed === 'string') ? <div>{parsed}</div> :
                    (typeof parsed === 'object') ? <div> 
                        {Object.entries(parsed).map((a,i)=>{return <div key={i}>-&nbsp;&nbsp;&nbsp;{a[0]}{': '}{JSON.stringify(a[1])}<br/></div>})}
                    </div>:
                    (parsed instanceof Array) ? <div> 
                        {parsed.map((a,i)=>{return <div key={i}>-&nbsp;&nbsp;&nbsp;{a[0]}: {a[1]}<br/></div>})}
                    </div>:JSON.stringify(parsed)
                )}
                <hr/>
            </div>
        })}
    </div>
}