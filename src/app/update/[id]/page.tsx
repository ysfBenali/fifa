import { Players } from '@prisma/client';
import Form from '@/app/components/Form';
import Nav from './nav';

export default async function Page({ params }: { params: { id: number } }) {
  const player: Players = await prisma.players.findUnique({
    where: {
      id: Number(params.id)
    }
  });

  return (
    <main className="py-4">
      <Nav />
      <div className="flex justify-center items-center h-[60%] my-12">
        <div className="w-[50%]">
          <Form
            id={Number(params.id)}
            player={{
              firstname: player?.firstname,
              lastname: player?.lastname,
              goal: player?.goal,
              salary: player?.salary?.toString() + ' ' + player?.devise
            }}
          />
        </div>
      </div>
    </main>
  );
}
