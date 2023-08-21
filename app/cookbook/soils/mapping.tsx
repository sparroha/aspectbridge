//-1,-1 yes
//let pass

//o,0 not no {1+-1}{1/x1}
//unaltered wild (BM)

//loam (a mixture of sand, silt and clay).

//1,1 soil is here
//cultivated growth

//5,5 seasons are present
//co op

//10.10 time is come
//fruit picked

//(BM) 20/20 for giving
//prossec returns

const nutrients = {
    primary: [
        'nitrogen', 'phosphorus', 'potassium'
    ],
    secondary: [
        'sulfur', 'magnesium', 'calcium'
    ],
    mains: []
}
const measurements = {
    0: ['percentage', 'ppm']
} 
    //secondary+precentage
    //mains+ppm
    
export default function Mapping(){
    return <>{JSON.stringify({...nutrients, ...measurements})}</>
}