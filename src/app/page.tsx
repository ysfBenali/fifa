import { Player } from './validation-schema';
import TRow from './components/TRow';
import Thead from './components/Thead';
import Pagination from './components/Pagination';
import { fetchPlayers } from './services';
import { Players } from '@prisma/client';

export default async function Home({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const headColumns = ['id', 'Nom Complet', 'Salaire Annuel', 'But', 'Actions'];

  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;

  const response = await fetchPlayers(page);
  const { data } = await response.json();

  return (
    <>
      <header>{/* <h1>Players List</h1> */}</header>
      <div className="flex justify-center items-center flex-col h-full">
        <div className="p-4 md:p-10 mx-auto max-w-7xl">
          <table className="border-collapse border">
            <thead>
              <Thead headColumns={headColumns} />
            </thead>
            <tbody>
              {data?.map((player: Players) => (
                <TRow key={player?.id?.toString()} player={player} />
              ))}
            </tbody>
          </table>
          <Pagination page={page} totalePages={20} />
        </div>
      </div>
    </>
  );
}
