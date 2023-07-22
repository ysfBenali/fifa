// import { Players } from "@prisma/client";

import { Player } from "../validation-schema";

export const fetchPlayers = async (page: number) => {
    const res = await fetch("http://localhost:3000/api/players?page=" + page,
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
            // devise: player.devise || "$",
            // pictureURl: player.pictureURl,
        }),
    });

    const data = await res.json();

    return data;
};