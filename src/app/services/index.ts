export const fetchPlayers = async (page: number) => {
    const res = await fetch("http://localhost:3000/api/players?page=" + page,
        {
            method: "GET",
            cache: "no-cache",
        });

    return res;
}