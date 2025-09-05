import { useRecurly } from "@recurly/react-recurly";
import { getQuery } from "../util/params";
import recurly from 'recurly';


// GET /api/recurly?name=World
export async function GET(req: Request, context: any, res: Response) {
    const token = useRecurly().token;
    //recurly.configure('ewr1-AxqCz2aZ9UMj5oOBsENPG2');
    const {
        //CRON_SECRET,
        RECURLY_API_KEY//need aquisition
    } = process.env;
    const client = new recurly.Client(RECURLY_API_KEY)

    //const authHeader = req.headers.get('Authorization');
    const query = getQuery(req);
    const accountId = query['actid'];
    const tokenId = query['token'] || token;
    if (!accountId) {
        return new Response('Missing account id', { status: 400 });
    }
    /*if (authHeader !== `Bearer ${CRON_SECRET}` && query['Authorization'] !== CRON_SECRET) {
        return new Response('Not authorized: auth='+query['Authorization'],{status: 401});
    }*/

    const account = await client.getAccount(accountId);
    await doCreateLineItems(client, account.id).then(() => {console.log('Line Items Done')})//!!!
    .then(()=>doInvoice(client, account.id, tokenId).then(() => {console.log('Invoice Done')}))//!!!

    /*const accounts = await client.listAccounts().each();
    for await (const account of accounts) {
        //console.log(account);
        if (account.lastName === 'Christensen') {
            console.log('Found Christensen')
            console.log(account)
            doCreateLineItems(client, account.id).then(() => {console.log('Line Items Done')})//!!!
            .then(()=>doInvoice(client, account.id).then(() => {console.log('Invoice Done')}))//!!!
        }
    //}*/
    

    return Response.json({ success: true });
}
async function doCreateLineItems(client, accountId: string) {
    try {
        let lineItemsCreate = {
            currency: 'USD',
            collectionMethod: 'automatic',
            total: (Math.random() * 15 + 10)/100,
            type: 'charge'
        }
        let lineItemsCollection = await client.createLineItems(accountId, lineItemsCreate)
        console.log('Created Line Items')
        console.log('Charge Line Items: ', lineItemsCollection.chargeLineItems)
        console.log('Credit Line Items: ', lineItemsCollection.creditLineItems)
    } catch (err) {
        if (err instanceof recurly.errors.ValidationError) {
        // If the request was not valid, you may want to tell your user
        // why. You can find the invalid params and reasons in err.params
        console.log('Failed validation', err.params)
        } else {
        // If we don't know what to do with the err, we should
        // probably re-raise and let our web framework and logger handle it
        console.log('Unknown Error: ', err)
        }
    }
}
async function doInvoice(client, accountId: string, tokenId) {
    try {
        let invoiceCreate = {
            currency: 'USD',
            collectionMethod: 'automatic',
            account: {
                code: accountId,
                billingInfo: {
                  tokenId: tokenId
                }
              },
        }
        let invoiceCollection = await client.createInvoice(accountId, invoiceCreate)
        console.log('Created Invoice')
        console.log('Charge Invoice: ', invoiceCollection.chargeInvoice)
        console.log('Credit Invoices: ', invoiceCollection.creditInvoices)
    } catch (err) {
        if (err instanceof recurly.errors.ValidationError) {
        // If the request was not valid, you may want to tell your user
        // why. You can find the invalid params and reasons in err.params
        console.log('Failed validation', err.params)
        } else {
        // If we don't know what to do with the err, we should
        // probably re-raise and let our web framework and logger handle it
        console.log('Unknown Error: ', err)
        }
    }
}