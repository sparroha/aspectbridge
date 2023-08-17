import { GetServerSideProps } from "next"
import sql from "../../lib/,base/sql"

export default function All(props){
    return <>{props.all.map((reg, i)=>{
        return <>{i}:{JSON.stringify(reg)}<hr/></>
    })}</>
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const allregistries = await sql`SELECT * FROM aspect_registry_;`
    return { props: { all: allregistries } }
}