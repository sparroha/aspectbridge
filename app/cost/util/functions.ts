export default true
export const raise = (n, prestige)=>{return (Math.pow(10,n)/10)*prestige}
export const magnitude = (n)=>{return Math.floor(Math.log10(n))}
export const tenTo = (n)=>{return Math.pow(10,n)}
export const lol = (n)=>{return n/tenTo(magnitude(n))}//some tiny fraction. n/10^log10(n)
export const prestigeCost = (prestige)=>{return tenTo(prestige)}
export const getState = (setState)=>{//get state from setState rather than state
    let current = 0
    setState((i)=>{current=i;return i})
    return current
}