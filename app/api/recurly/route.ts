import { getQuery } from "../util/params";
import recurly, { Account } from 'recurly';

// GET /api/recurly?name=World
export async function GET(req: Request, context: any, res: Response) {

    const {
        RECURLY_SUBDOMAIN,
        RECURLY_API_KEY,
        RECURLY_PUBLIC_KEY,
        SUCCESS_URL,
        ERROR_URL,
        PUBLIC_DIR_PATH
    } = process.env;
    const client = new recurly.Client(RECURLY_API_KEY)

    const authHeader = req.headers.get('Authorization');
    const query = getQuery(req);
    const secret = process.env.CRON_SECRET;
    if (authHeader !== `Bearer ${secret}` && query['Authorization'] !== secret) {
        return new Response('Not authorized: auth='+query['Authorization'],{status: 401});
    }

    const accounts = await client.listAccounts().each();
    for await (const account of accounts) {
        console.log(account);
        if (account.lastName === 'Christensen') {
            console.log('Found Christensen')
            console.log(account)

            doInvoice(client, account.id).then(() => {console.log('Invoice Done')})//!!!
        }
    }
    

    return Response.json({ success: true });
}
async function doInvoice(client, accountId: string) {
    try {
        let invoiceCreate = {
        currency: 'USD',
        collectionMethod: 'automatic'
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