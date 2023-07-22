'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Players } from '@prisma/client';
import { deletePlayer } from '../services';
import Link from 'next/link';

type Props = {
  player: Players;
};

export default function TRow({ player }: Props) {
  const router = useRouter();

  const handleDeletePlayer = async () => {
    await deletePlayer(player?.id);
    router.refresh();
  };

  return (
    <tr key={player?.id?.toString()} className="text-center">
      <td className="px-5 py-5">{player?.id}</td>
      <td className="px-5 py-5">
        {player?.firstname + '  ' + player?.lastname}
      </td>
      <td className="px-5 py-5">{player?.salary.toString()}</td>
      <td className="px-5 py-5">{player?.goal}</td>
      <td className="px-5 py-5">
        <Link href={`/edit?id=${player?.id}`}>
          <span
            className="px-2 py-1 rounded-md text-blue-500 cursor-pointer
          hover:bg-blue-400 hover:text-white
          "
          >
            Edit
          </span>
        </Link>
        <span
          onClick={handleDeletePlayer}
          className="px-2 py-1 rounded-md text-red-500 cursor-pointer
          hover:bg-red-400 hover:text-white

          "
        >
          Delete
        </span>
      </td>
    </tr>
  );
}
