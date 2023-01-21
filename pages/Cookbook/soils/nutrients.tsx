import { Col } from "react-bootstrap"
import SimpleNav from "../../../components/simplenav"

export default function Nutrients (){
    return <Col md={3}><SimpleNav title={'nutrients'} links={['nitrogen', 'potassium', 'phosphorus']} /></Col>
}

//function=nutrients [10,10]
const nitrogenObj ={protoncount:"7"}
const potassiumObj ={protoncount:"19"}
const phosphorusObj ={protoncount:"15"}
//primary nutrients = nitrogen,phosphorus,potassium

const sulferObj ={protoncount:"16"}
const magnesiumObj ={protoncount:"12"}
const calciumObj ={protoncount:"20"}
//secondary

const ironObj ={protoncount:"26"}
const boronObj ={protoncount:"5"}
const manganeseObj ={protoncount:"25"}
const zincObj ={protoncount:"30"}
const molybdenumObj ={protoncount:"42"}
const copperObj ={protoncount:"29"}
const cobaltObj ={protoncount:"27"}
const chlorineObj ={protoncount:"17"}
const nickleObj ={protoncount:"28"}
//macro

//function=drainage
//function=retention 
//nutrients=18

//primary nutrients > quantities than other nutrients.
//Law of the Minimum = if any nutrient is < nutrual = 0
//any nutrient amounts = limits for yields.