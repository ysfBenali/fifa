import React from 'react';

type Props = {
  headColumns: string[];
};

export default function Thead({ headColumns }: Props) {
  return (
    <tr className="text-center capitalize">
      {headColumns?.map((col) => (
        <th key={col} className="px-6 py-3">
          {col}
        </th>
      ))}
    </tr>
  );
}
