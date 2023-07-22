import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const player = await request.json();

        const existingPlayer = await prisma.players.findFirst({
            where: {
                firstname: player.firstname,
                lastname: player.lastname,
            },
        });

        if (existingPlayer) {
            return new Response(JSON.stringify({ error: "Player already exists" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const newPlayer = await prisma.players.create({
            data: player,
        });

        const parsedPlayer = JSON.parse(
            JSON.stringify(newPlayer, (key, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );

        return new Response(JSON.stringify(parsedPlayer), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (err) {
        console.log(err);
        return new Response("an error occured ", {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });

    }
}
