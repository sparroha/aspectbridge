import Heat from "./heat";
import Spark from "./links/spark";
import Structure from "./stucture";

export default function Heating(){
    return <>
        <Structure/>
        <Heat/>
        <div is={'Links'}>
            <Spark/>
        </div>
    </>
}