
export default function Nutrients (){
    return <div>
        {['nitrogen', 'potassium', 'phosphorus'].map((nutrient, i) => {
            return <div key={i}>
                {nutrient}<hr/>
            </div>
        })}
        </div>
}

//function=nutrients [10,10]

//function=drainage
//function=retention 
//nutrients=18

//primary nutrients > quantities than other nutrients.
//Law of the Minimum = if any nutrient is < nutrual = 0
//any nutrient amounts = limits for yields.