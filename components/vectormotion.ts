//IF the animation rate is constand, then the speed is variable within the vector
//speed = Math.sqrt(x * x + y * y) where x, y is the vector
//distance covered in animation duration is = speed
//distance / time = speed
//speed is the hypotinuse of the vector
//

import { Vector } from "./vectortransition";

//type Vector = { x: number, y: number }
function getSpeed(V: Vector) {
    return Math.sqrt(V.x * V.x + V.y * V.y)
}




