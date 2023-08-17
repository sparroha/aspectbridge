import { GetServerSideProps } from "next"
import sql from "../../lib/,base/sql"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"

export default function All(props){
    const {all, id, name, data } = props
    const full = (!id&&!name&&!data)
    return <>{all.map((reg, i)=>{
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
    })}</>
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id, name, data } = context.query
    const allregistries = await sql`SELECT * FROM aspect_registry_;`
    return { props: { all: allregistries, id: id?true:false, name: name?true:false, data: data?true:false} }
}