export default function Composts(){
    const eggshell={elements:['Ca','C','O3']}
    var soil = "dirt"
    console.log(soil) 
    function compost(igredient,soil){
        let newSoil = "new "+ soil + " with " 
        + igredient.elements[0] +" and "+ igredient.elements[1] +" and "+ igredient.elements[2]

        return newSoil
    }

    soil = compost(eggshell,soil)
    console.log(soil) 
    //soil = "new dirt with Ca and C and O3"
    //localhost:3000/Cookbook/soils/composts
    return <></>
}