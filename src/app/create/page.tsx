import Nav from './nav';
import Form from '../components/Form';

export default function Page() {
  return (
    <main className="py-4">
      <Nav />
      <div className="flex justify-center items-center h-[60%] my-12">
        <div className="w-[50%]">
          <Form />
        </div>
      </div>
    </main>
  );
}
