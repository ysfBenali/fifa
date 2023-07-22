import { prisma } from "@/lib/prisma"

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const playerId = parseInt(searchParams.get('id')?.toString() as string)

        const player = await prisma.players.findUnique({
            where: {
                id: playerId,
            },
        })

        if (!player) {
            return new Response(JSON.stringify({ error: 'The player not found' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }
        const deletedPlayer = await prisma.players.delete({
            where: {
                id: playerId,
            },
        })

        const parsedPlayer = JSON.parse(
            JSON.stringify(deletedPlayer, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value,
            ),
        )
        return new Response(JSON.stringify(parsedPlayer), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (err) {
        console.log(err)
        return new Response('an error occured ', {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}
