"use server"

import { Player } from "@/app/validation-schema"

export const updatePlayer = async (id: number, player: Player) => {
    const salary = parseInt(player.salary.split(" ")[0])
    const devise = player.salary.split(" ")[1]

    try {
        const res =
            await prisma.players.update({
                where: {
                    id: id
                },
                data: {
                    firstname: player.firstname,
                    lastname: player.lastname,
                    salary: salary,
                    devise: devise,
                    goal: player.goal
                }
            })

        return res;
    } catch (e) {
        console.log(e);

        return new Response(JSON.stringify({
            message: "An error occured"
        }), { status: 500 })

    }
}