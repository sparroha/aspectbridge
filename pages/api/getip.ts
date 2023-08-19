import requestIp from 'request-ip';
export default async function getIp(req, res){
    const ip = await requestIp.getClientIp(req)
    if(!ip) res.status(400).json({message: 'No ip provided.'})

    return res.status(200).json(ip)
}