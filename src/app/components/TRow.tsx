import React from 'react';
import { Player } from '../validation-schema';

type Props = {
  player: Player;
};

export default function TRow({ player }: Props) {
  return (
    <tr key={player?.id?.toString()} className="text-center">
      <td className="px-5 py-5">{player?.id}</td>
      <td className="px-5 py-5">
        {player?.firstname + '  ' + player?.lastname}
      </td>
      <td className="px-5 py-5">{player?.salary}</td>
      <td className="px-5 py-5">{player?.goal}</td>
      <td className="px-5 py-5">
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  );
}
