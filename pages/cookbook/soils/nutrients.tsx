import { Col } from "react-bootstrap"
import SimpleNav from "../../../components/simplenav"

export default function Nutrients (){
    return <Col md={3}><SimpleNav title={'nutrients'} links={['nitrogen', 'potassium', 'phosphorus']} /></Col>
}

//function=nutrients [10,10]

//function=drainage
//function=retention 
//nutrients=18

//primary nutrients > quantities than other nutrients.
//Law of the Minimum = if any nutrient is < nutrual = 0
//any nutrient amounts = limits for yields.