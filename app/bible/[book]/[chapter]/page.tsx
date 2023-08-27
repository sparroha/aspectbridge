export default function Chapter({params}){
    const {book, chapter, verse} = params
    return <>
        {book} {chapter}:{verse}
        {book=='Genesis'&&chapter==1&&verse==1&&<>
            In the Beginning there was water and air<br/>
            
            </>}
    </>
}