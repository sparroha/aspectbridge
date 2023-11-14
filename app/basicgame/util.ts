export function rand(n){
    let r = Math.floor(Math.random()*n+(n>0?1:0))
    //console.log('random of '+n, r)
    return r
}
type Recipe = {item: string, count: number, plan: {material: string, cost: number}[]}
export function craft(state: any, recipe: Recipe): any{

    let a = recipe.plan
    let substate = {}
    for(let i=0;i<a.length;i++){
        if(!state || Object.entries(state).filter((v)=>v[1]==a[i].material).length==0) {alert("strange; it seems you haven't acquird that yet"); return state}
        if(state[a[i].material]<a[i].cost) {alert('not enough '+a[i]); return state}
        substate = {...substate, [a[i].material]: state[a[i].material]-a[i].cost}
    }
    return {...state, ...substate, [recipe.item]: state[recipe.item]?state[recipe.item]+2:2}
}
//craft(null, {item: 'metal', count: 2, plan: [{material: 'ore', cost: 3},{material: 'wood', cost: 3}]})

//work = surplus energy
export function piston(work: number, energy: number): {actions: number, work: number}{
    const base = 10
    let actions = Math.floor((work+energy)/base)
    let xwork = (work+energy)%base
    return {
        actions: actions,
        work: xwork
    }
}

export const responsive = (colx)=>{
    let size = {}
    switch(colx){
        case 1: size = {xs: 12, sm: 12, md: 12, lg: 12}; break;
        case 2: size = {xs: 12, sm: 12, md: 12, lg: 6}; break;
        case 3: size = {xs: 12, sm: 12, md: 6, lg: 4}; break;
        case 4: size = {xs: 12, sm: 6, md: 4, lg: 3}; break;
        case 6: size = {xs: 6, sm: 4, md: 3, lg: 2}; break;
        case 12: size = {xs: 4, sm: 3, md: 2, lg: 1}; break;
        default: size = {xs: 12, sm: 12, md: 12, lg: 12}; console.log('invalid colx size'); break;
    }
    return size
}