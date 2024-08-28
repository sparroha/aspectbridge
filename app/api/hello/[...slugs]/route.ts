import { NextResponse } from "next/server";
import { getSpreadSlugs } from "../../util/params";

export function GET(req: Request, context: any, res: Response){
    /**
     * const slugs = context.params.slugs;
     * getSlugs()
     */
    const slugs = getSpreadSlugs(context, 'slugs');
    //const slugs: string[] = getSpreadSlugs(context) = context.params.slugs;
    return NextResponse.json({context: context, slugs: slugs});
}