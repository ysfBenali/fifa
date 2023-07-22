'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Player, PlayerSchema } from '../validation-schema';
import Field from '../components/Field';
import { addPlayer } from '../services';

export default function Form() {
  const router = useRouter();

  const [helperText, setHelperText] = useState<string>('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Player>({
    resolver: zodResolver(PlayerSchema)
  });

  const onSubmit: SubmitHandler<Player> = (data) => {
    const innerData = {
      ...data,
      salary: parseInt(data.salary.toString().split(' ')[0]),
      devise: data.salary.toString().split(' ')[1]
    };

    //@ts-ignore
    addPlayer(innerData)
      .then((res) => {
        if (res.error) {
          setHelperText(res.error);
        } else router.push('/?page=1');
      })
      .catch((err) => {
        console.log(err);
        setHelperText('an error occured');
      });
  };

  return (
    <>
      <div className="flex justify-center h-full items-center">
        <div className="w-3/2">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <Field
              register={register}
              label="Nom"
              type="text"
              name="firstname"
              defaultValue=""
              error={errors?.firstname?.message}
            />
            <Field
              register={register}
              label="Prenom"
              type="text"
              name="lastname"
              defaultValue=""
              error={errors?.lastname?.message}
            />
            <Field
              register={register}
              label="Salaire annuel"
              type="string"
              name="salary"
              defaultValue=""
              error={errors?.salary?.message}
            />
            <Field
              register={register}
              label="Nombre de but"
              type="number"
              name="goal"
              defaultValue={0}
              error={errors?.goal?.message}
            />

            <div className="flex justify-between px-4 pt-2">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md mt-2"
              >
                Sauvegarder
              </button>

              <button
                className="bg-gray-400 outline text-white p-2 rounded-md mt-2"
                type="button"
                onClick={() => reset()}
              >
                Annuler
              </button>
            </div>
          </form>
          {helperText && (
            <div className="bg-red-500 text-white p-2 rounded-md mt-2">
              {helperText}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
