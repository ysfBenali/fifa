import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || 1;
        const limit = 6;

        const result = await prisma.players.findMany(
            {
                skip: (+page - 1) * +limit,
                take: +limit,
            }
        );

        const parsedResult = JSON.parse(
            JSON.stringify(result, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value));

        if (parsedResult.length === 0) {
            return new Response(JSON.stringify({
                data: []
            }), { status: 200 });
        }

        const data = {
            data: parsedResult
        };

        return new Response(JSON.stringify(data), { status: 200 });
    }
    catch (err) {
        console.log(err)
        return new Response('an error occured'
            , {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    }

}