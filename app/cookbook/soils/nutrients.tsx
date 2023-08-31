
export default function Nutrients (){
    return <div>
        <h1>Nutrients</h1><br/>
        {['nitrogen', 'potassium', 'phosphorus'].map((nutrient, i) => {
            return <div key={i}>
                {nutrient}<hr/>
            </div>
        })}
            
        {'function=nutrients [10,10]'}<br/>
        <br/>
        {'function=drainage'}<br/>
        {'function=retention '}<br/>
        {'nutrients=18'}<br/>
        <br/>
        {'primary nutrients > quantities than other nutrients.'}<br/>
        {'Law of the Minimum = if any nutrient is < nutrual = 0'}<br/>
        {'any nutrient amounts = limits for yields.'}<br/>
    </div>
}
