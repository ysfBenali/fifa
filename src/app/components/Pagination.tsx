import Link from 'next/link';

type Props = {
  page: number;
  totalePages: number;
};

export default function Pagination({ page, totalePages }: Props) {
  return (
    <div className="flex row justify-center mt-4">
      {page === 1 ? (
        <div className="text-white rounded-md px-3 py-2 hover:bg-black/75 capitalize bg-black cursor-not-allowed">
          prev
        </div>
      ) : (
        <Link href={`/?page=${page - 1}`}>
          <div className="text-white rounded-md px-3 py-2 hover:bg-black/75 capitalize bg-black">
            prev
          </div>
        </Link>
      )}
      <div className="text-back rounded-md px-3 py-2 mx-4 border border-black">
        {page}/{totalePages}
      </div>
      {page === totalePages ? (
        <div className="text-white rounded-md px-3 py-2 hover:bg-black/75 capitalize bg-black cursor-not-allowed">
          next
        </div>
      ) : (
        <Link href={`/?page=${page + 1}`}>
          <div className="text-white rounded-md px-3 py-2 hover:bg-black/75 capitalize bg-black">
            next
          </div>
        </Link>
      )}
    </div>
  );
}
