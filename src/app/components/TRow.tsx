'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Players } from '@prisma/client';
import { deletePlayer } from '../services';
import { shortenNumber } from '@/utils/shortenNumber';
import Link from 'next/link';

type Props = {
  player: Players;
};

export default function TRow({ player }: Props) {
  const router = useRouter();

  const handleDeletePlayer = async () => {
    //confirm delete
    const confirmDelete = confirm(
      `Are you sure you want to delete ${player?.firstname} ${player?.lastname} ?`
    );
    if (!confirmDelete) return;
    await deletePlayer(player?.id);
    router.refresh();
  };

  const handleCopyPlayerToClipboard = () => {
    if (navigator.clipboard) {
      //modern browsers
      navigator.clipboard.writeText(JSON.stringify(player));
    } else {
      //old browsers
      const textArea = document.createElement('textarea');
      textArea.value = JSON.stringify(player);
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    alert('Player copied to clipboard');
  };

  return (
    <tr
      key={player?.id?.toString()}
      className="text-center border border-gray-400 hover:bg-gray-200 transition duration-100 ease-in-out"
    >
      <td className="px-2 py-3">{player?.id}</td>
      <td className="px-2 py-3">
        {player?.firstname + '  ' + player?.lastname}
      </td>
      <td className="px-2 py-3">
        {shortenNumber(Number(player?.salary), { noSpace: true })}
        &nbsp;
        <span className="font-bold text-gray-600">{player?.devise}</span>
      </td>
      <td className="px-2 py-3">{player?.goal}</td>
      <td className="px-2 py-3">
        <div className="flex justify-evenly">
          <Link href={`/update/${player?.id}`}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-6 h-6  text-gray-600 transition ease-in-out delay-100 hover:scale-110 hover:text-sky-500 duration-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </div>
          </Link>
          <div
            className="cursor-pointer"
            onClick={() => {
              handleCopyPlayerToClipboard();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600  transition ease-in-out delay-100 hover:scale-110 hover:text-sky-500 duration-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
              />
            </svg>
          </div>
          <div className="cursor-pointer" onClick={handleDeletePlayer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 transition ease-in-out delay-100 hover:scale-110 hover:text-red-500 duration-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        </div>
      </td>
    </tr>
  );
}
