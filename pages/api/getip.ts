import requestIp from 'request-ip';
export default async function getIp(req, res){
    try{
        let ip = await requestIp.getClientIp(req)
        return res.status(200).json(ip)
    }catch(err){
        console.log('@getIp://error: '+err)
        return res.status(400).json({message: 'No ip provided.', error: err})
    }
}