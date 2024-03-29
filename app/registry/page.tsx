import sql from "../../lib/,base/sql"
//import { RegistryEntry } from "../api/registry/route"

export default async function All({params, searchParams}){
    const all/*: RegistryEntry[]*/ = await sql`SELECT * FROM aspect_registry_;`
    return <div style={{backgroundColor: 'white'}}>
        {all.map((reg, i)=>{
            let parsed: string | {} | [] = reg.registry_data
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
                )}<br/>
                <hr/>
            </div>
        })}
    </div>
}


/**- wait compiling...
- error ./node_modules/mysql2/lib/connection.js:18:0
Module not found: Can't resolve 'net'

https://nextjs.org/docs/messages/module-not-found

Import trace for requested module:
./node_modules/mysql2/index.js
./lib/,base/sql.ts
./app/api/users/active/route.ts
./lib/util/^activeusers.ts
./lib/util/^user.ts
./app/chat/chat.tsx
./pages/gather/index.tsx */