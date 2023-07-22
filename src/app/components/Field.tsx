import { UseFormRegister } from 'react-hook-form';
import { Player } from '../validation-schema';

export default function Field({
  label,
  name,
  type,
  register,
  defaultValue,
  error
}: {
  register: UseFormRegister<Player>;
  label: string;
  type: string;
  name: keyof Player;
  defaultValue?: any;
  error?: string;
}) {
  return (
    <>
      <label className="text-sm text-black my-2" htmlFor="firstname">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="border border-gray-400 p-2 rounded-md"
      />
      {error && <span className="text-red-500">{error}</span>}
    </>
  );
}
