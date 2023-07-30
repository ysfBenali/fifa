import Link from 'next/link';

export default async function Nav() {
  return (
    <nav className="border-black border-b font-bold text-xl">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-black text-md rounded-md px-3 py-2 capitalize">
                Players List
              </h1>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end">
            <Link href="/create">
              <div className="flex-shrink-0 flex items-center text-sm text-white rounded-md px-3 py-2 hover:bg-black/75 capitalize bg-black ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                add new player
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
