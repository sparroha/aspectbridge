export function getSearchParams(req: Request): URLSearchParams {
    return (new URL(req.url)).searchParams;
}
export function getQueryArray(req: Request): [string, string][] {
    const sP = getSearchParams(req)
	const query: [string, string][] = Array.from(sP)
    return query
}
export function getParams(context: any): string | string[] | {[key: string]: string[]} {
    return context.params;
}
export function getSlug(req: Request, context: any): string {
    const url = new URL(req.url);
    const path = url.pathname
    const slug = path.substring(path.lastIndexOf('/')+1)//slug
    return slug
}