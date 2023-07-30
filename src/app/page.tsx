import { Players } from '@prisma/client';
import { fetchPlayers } from './services';
import Nav from './nav';
import TRow from './components/TRow';
import Thead from './components/Thead';
import Pagination from './components/Pagination';

export default async function Home({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const headColumns = ['id', 'full Name', 'annual Salary', 'goals', 'actions'];
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;

  const response = await fetchPlayers(page);
  const {
    data: { players, totalPages }
  } = await response.json();

  return (
    <main className="py-4">
      <Nav />
      <div className="w-[60%] mx-auto my-12 h-[320px]">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead className="bg-slate-300">
            <Thead headColumns={headColumns} />
          </thead>
          <tbody>
            {players?.map((player: Players) => (
              <TRow key={player?.id?.toString()} player={player} />
            ))}
          </tbody>
        </table>
        <Pagination page={page} totalePages={totalPages} />
      </div>
    </main>
  );
}
