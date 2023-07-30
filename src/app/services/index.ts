import { Player } from "../validation-schema";

const baseUrl = process.env.NODE_ENV === "production" ?
    process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:3000";

export const fetchPlayers = async (page: number) => {
    const res = await fetch(`${baseUrl}/api/players?page=` + page,
        {
            method: "GET",
            cache: "no-cache",
        });

    return res;
}

export const deletePlayer = async (id: number | undefined) => {
    const res = await fetch("/api/players/delete?id=" + id, {
        method: "DELETE"
    });
    return res;
};


export const addPlayer = async (player: Player) => {
    const res = await fetch("/api/players/add", {
        method: "POST",
        body: JSON.stringify({
            ...player,
            salary: parseInt(player.salary.toString().split(' ')[0]),
            devise: player.salary.toString().split(' ')[1]
        }),
    });

    const data = await res.json();

    return data;
};