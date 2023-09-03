import { GetServerSideProps } from "next"
import sql from "../../lib/,base/sql"
import { Container } from "react-bootstrap"

export default function GET(props){
    const {id, registry, name, data } = props
    const full = (!id&&!name&&!data)
    
    let parsed = registry.registry_data
    try{
        parsed = JSON.parse(registry.registry_data)
    }catch(e){
        console.log(e+' | '+registry.registry_data)
    }
    return <div>
        {id || full?'ID:  '+registry.id+' ':null}{id || full?<br/>:null}
        {name || full?'Name:  '+registry.name+' ':null}{name || full?<br/>:null}
        {data || full?'Data: ':null}
        {data || full?(
            (typeof parsed === 'string') ? <Container>{parsed}</Container> :
            (typeof parsed === 'object') ? <Container> 
                {Object.entries(parsed).map((a,i)=>{return <div key={i}>-{a[0]}{': '}{JSON.stringify(a[1])}<br/></div>})}
            </Container>:
            (parsed instanceof Array) ? <Container> 
                {parsed.map((a,i)=>{return <div key={i}>-{a[0]}: {a[1]}<br/></div>})}
            </Container>:JSON.stringify(parsed)
            ):null}
        {data || full?<br/>:null}
        <hr/>
    </div>
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { register, id, name, data } = context.query
    const [registry] = await sql`SELECT * FROM aspect_registry_ WHERE name = ${register};`
    return { props: { registry: registry, id: id?true:false, name: name?true:false, data: data?true:false} }
}