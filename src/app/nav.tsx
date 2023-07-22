import Link from 'next/link';

export default async function Nav() {
  return (
    <div>
      <div>
        <nav className="bg-slate-800">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link
                    href="/"
                    className="text-white text-2xl font-bold rounded-md px-3 py-1 hover:bg-slate-500"
                  >
                    Liste des Joueurs
                  </Link>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end">
                <div className="flex-shrink-0 flex items-center text-white text-2xl rounded-md font-bold px-3 py-1 hover:bg-slate-500">
                  <Link href="/create">Ajouter un Joueur</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
