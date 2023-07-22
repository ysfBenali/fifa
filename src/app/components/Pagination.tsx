type Props = {
  page: number;
  totalePages: number;
};

export default function Pagination({ page, totalePages }: Props) {
  return (
    <div className="flex row justify-center mt-4">
      <span className="p-2">prev</span>
      <span className="p-2">{page}</span>
      <span className="p-2">next</span>
    </div>
  );
}
