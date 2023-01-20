import { isNullOrUndefined } from "util"
import { Z_NEED_DICT } from "zlib"

//expanded array format
const soilNutrientMap =[
    [
        "nuetral",
        ["nitrogen","potasium","phosphorus"] //soilNutrientMap[0][1][1] returns "potasium"
    ], 
    [
        [,,,,,,,"shovel",,"hose"], //soilNutrientMap[1][0][7] returns shovel
        false
    ]
]
//expanded object format
const soilNutrientMapObj = {

    soil: {
        surface: "nuetral",
        nutrients: ["nitrogen","potasium","phosphorus"] //soilNutrientLevelObj.soil.nutrients[1] returns "potasium"
    }, 
    cultivation: {
        tools: [,,,,,,,"shovel",,{hose: ["water", "rubber tube"]}], //soilNutrientMapObj.cultivation.tools[7] returns shovel
        isCultivated: true
    }
} //expanded array format
console.log(soilNutrientMap[0][0]) //prints "nuetral"
console.log(soilNutrientMapObj.cultivation.tools[7]) //prints "shovel"
//function=ph 
type PH = {
    balance: 10.10,
    value
}


const nutrientQuanta = ""
const data_base = ""
const _table = ""
var somethingElse

//example initial function. loads when page is accessed.
export default function Default (){
    return <>
        <JSXfunction />{/**onChange: rerenders only this elememnt */}
        {regularFunction() /**onChange: rerenders entire page */}
    </>
}

//onChange: rerenders only this elememnt
export function JSXfunction(){
    return <>
        <div></div>
    </>
}
//onChange: rerenders entire page
function regularFunction(){
    return <>
        <div></div>
    </>
}


//Of all the essential nutrients, nitrogen is required by plants in the largest quantity and 
//is most frequently the limiting factor in crop productivity.

//In plant tissue, the nitrogen content ranges from 1 and 6%.
//Proper management of nitrogen is important because it is often the most limiting nutrient in crop production 
//and easily lost from the soil system.
//Nitrogen Forms and Function
//Forms of nitrogen available for plant uptake
//Ammonium
//Nitrate
//Functions of nitrogen in plants
//Nitrogen is an essential element of all amino acids. Amino acids are the building blocks of proteins.
//Nitrogen is also a component of nucleic acids, which form the DNA of all living things and holds the genetic code.
//Nitrogen is a component of chlorophyll, which is the site of carbohydrate formation (photosynthesis).
//Chlorophyll is also the substance that gives plants their green color.
//Photosynthesis occurs at high rates when there is sufficient nitrogen.
//A plant receiving sufficient nitrogen will typically exhibit vigorous plant growth. 
// Leaves will also develop a dark green color.
