const elements = {
    hydrogen: ['H',{protoncount:"1"}],
    carbon: ['C',{protoncount:"6"}],
    oxegen: ['H',{protoncount:"8"}],
    nitrogen: ['N',{protoncount:"7"}],
    potassium: {protoncount:"19"},
    phosphorus: {protoncount:"15"},
//primary nutrients:  nitrogen,phosphorus,potassium

    sulferObj: {protoncount:"16"},
    magnesiumObj: {protoncount:"12"},
    calcium: ['Ca',{protoncount:"20"}],
//secondary

    ironObj: {protoncount:"26"},
    boronObj: {protoncount:"5"},
    manganeseObj: {protoncount:"25"},
    zincObj: {protoncount:"30"},
    molybdenumObj: {protoncount:"42"},
    copperObj: {protoncount:"29"},
    cobaltObj: {protoncount:"27"},
    chlorineObj: {protoncount:"17"},
    nickleObj: {protoncount:"28"},
//macro
}

export default function Molecules(){
    return <>
        <h1>Molecules</h1><br/>
        {JSON.stringify(elements)}
    </>
}