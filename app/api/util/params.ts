/**
 * SEARCH
 */
export function getURL(req: Request): URL {
    return new URL(req.url);
}
export function getSearchParams(req: Request): URLSearchParams {
    return getURL(req).searchParams;
}
export function getQueryArray(req: Request): [string, string][] {
	return Array.from(getSearchParams(req))
}
export function getQuery(req: Request): {[key: string]: string} {
    return Object.fromEntries(getQueryArray(req));
}
/**
 * SLUGS
 */
export function getParams(context: any): {[key: string]: string} {//unsure of types
    return context.params;
}
//context: {"params":{"id":"1"}}
export function getSlug(context: any, slug: string): string {
    return getParams(context)[slug];
}
//context: {"params":{"id":"1","name":"2"}}
export function getSlugs(context: any): {[key: string]: string} {
    return getParams(context)
}
//context: {"params":{"slugs":["1","2","3"]}}
export function getSpreadSlugs(context: any, slugs: string): string[] {
    return getParams(context)[slugs].toString().split(',');//hack the array into an array. original array was acting strange so I asserted it to array
}