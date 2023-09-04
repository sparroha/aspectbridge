import sql from "../../../lib/,base/sql"

export default async function Select({params, searchParams}){
    const url = new URL(params.url);
    const nameFor = url.pathname
    const {id, name, data } = searchParams
    const select = await await sql`SELECT * FROM aspect_registry_ WHERE name = ${nameFor || name};`
    const full = (!id&&!name&&!data)
    return <div style={{backgroundColor: 'white'}}>{select.map((reg, i)=>{
        let parsed = reg.registry_data
        try{
            parsed = JSON.parse(reg.registry_data)
        }catch(e){
            console.log(e+' | '+reg.registry_data)
        }
        return <div key={i}>
            {id || full?'ID:  '+reg.id+' ':null}{id || full?<br/>:null}
            {name || full?'Name:  '+reg.name+' ':null}{name || full?<br/>:null}
            {data || full?'Data: ':null}
            {data || full?(
                (typeof parsed === 'string') ? <div>{parsed}</div> :
                (typeof parsed === 'object') ? <div> 
                    {Object.entries(parsed).map((a,i)=>{return <div key={i}>-{a[0]}{': '}{JSON.stringify(a[1])}<br/></div>})}
                </div>:
                (parsed instanceof Array) ? <div> 
                    {parsed.map((a,i)=>{return <div key={i}>-{a[0]}: {a[1]}<br/></div>})}
                </div>:JSON.stringify(parsed)
                ):null}
            {data || full?<br/>:null}
            <hr/>
        </div>
    })}</div>
}